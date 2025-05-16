const express = require("express")
const {authMiddleware} = require('../middleware')
const {Account}= require('../db')
const {default:mongoose} = require('mongoose')

const router = express.Router()

router.get("/balance", authMiddleware, async(req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })
    if(!account){
        return res.status(404).json({
            message:"Account not found!"
        })
    }
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req,res)=>{
    // best way: create a session
    const session = await mongoose.startSession()

    session.startTransaction()
    const {amount, to} = req.body

    //fetching the accounts within the transaction
    const account = await Account.findOne({userId: req.userId}).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "insufficient balance!!"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "invalid account!!"
        })
    }

    // perform the transfer
    // $inc is used for increment/decrement in mongoDb
    // by default $inc used for adding, when you do -amount then explicitlly you are decresing the amount
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session) // debiting money
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session) // credinting money
    
    // committing the transaction
    await session.commitTransaction()
    res.json({
        message: "Transfer successfull !!"
    })
})

module.exports = router;