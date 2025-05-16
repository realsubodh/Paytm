const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");

//signup route | zod validation
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input fields. Please check your data.",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already taken.",
    });
  }

  // BUG 1
  const user = await User.create(req.body);
  const userId = user._id;

  // giving some random amount to user b/w 1 to 10k
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  // const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
  );


  res.json({
    message: "user created successfully!",
    token: token,
  });
});

// creating the signin end point
// first define the zod validation
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "email already taken/invalid authentication",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
    );
    return res.json({
      token: token,
    });
  }
  res.status(411).json({
    message: "error while logging in!!",
  });
});

// Route to update the user information

const updateBody = zod.object({
  password: zod.string().optional(), // optional() is a function
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "error while updating the information",
    });
  }

  // ❌ updateOne expects: (<filter>, <update>) 
  await User.updateOne(req.body,
    {id: req.userId},  // filter
    {$set: req.body}   // update
  );
  res.json({
    message: "information updated successfully!!",
  });
});

// important route
// route to get users from the backend, filterable via firstName/lastName

// doing the or/like query in MongoDB
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
