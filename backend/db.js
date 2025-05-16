const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://subodhsingh3477:FridaY7880@cluster0.k5y3sbt.mongodb.net/"
);

// creating the userschema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

// creating the accounts sschema
const accountSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,  // Reference to User model
    ref: 'User',
    required: true
  },
  balance:{
    type: Number,
    required: true
  }
})
// we have use type and ref above just to make sure that the be have strict limitations, in case any bug in be hits, it will not affect the architecture of whole be database 

// creating the model
const Account = mongoose.model('Account', accountSchema )
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  Account,
};
