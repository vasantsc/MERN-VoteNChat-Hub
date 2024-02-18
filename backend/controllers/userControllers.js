const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
console.log(req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      pic: newUser.pic,
      token:generateToken(newUser._id,newUser.name,newUser.email)
    });
  } else {
    res.status(500)
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const existUser = await User.findOne({email});
    if(existUser && (await existUser.matchPassword(password))){
        res.json({
            _id: existUser._id,
            name: existUser.name,
            email: existUser.email,
            pic: existUser.pic,
            token:generateToken(existUser._id,existUser.name,existUser.email)
        })
    }
})
module.exports = {registerUser,authUser};