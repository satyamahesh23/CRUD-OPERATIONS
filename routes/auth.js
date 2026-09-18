const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect=require("../middleware/auth")





router.get("/me",protect,async (req,res) => {
  try {
    const user=await User.findById(req.userId).select("-password")
     if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({success:true,user})
  } catch (error) {
     res.status(500).json({ success: false, message: error.message });
    
  }
  
})

//helper function

const generateToken = (userId) => {
  // our jwt will verify the jwt_secret for verification
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//  POST /api/auth/signup

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      sameSite: "strict",
    });
    res.status(201).json({
        success: true,
      user: { id: user._id, name: user.name, email: user.email },
 
    })
  } catch (error) {
    res.status(400).json({success: false, message: error.message })
  }
});

router.post('/login',async (req,res) => {
  try {
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
      return res.status(401).json({success:false,message: 'Invalid email or password'})
    }
    const ismatch=await user.comparePassword(password)
    if(!ismatch){
      return  res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const token=generateToken(user._id)

    res.cookie("token",token,{
        httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    })
    res.status(201).json({
      success:true,
      user:{
        id:user._id,name:user.name,email:user.email
      }
    })

    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  
  }
  
})

router.post('/logout',(req,res)=>{
  res.clearCookie('token')
  res.status(200).json({success:true,message:"logget out"})
})
module.exports=router