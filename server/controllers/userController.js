import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

//Signup a new user
export const signup = async (req,res)=>{
  const {fullName, email, password, bio} = req.body;
  try {
    //1).validate user input
    if(!fullName || !email || !password || !bio){
      return res.json({success:false , message : "Missing Details" });
    }
      //2). check if user already exists
      const user = await User.findOne({email});
      if(user){
        return res.json({success:false , message : "User already exists" })
      }
      //3). hash password
      const salt= await bcrypt.genSalt(10);
      const hashedPassword= await bcrypt.hash(password, salt);
      //4). create new user
      const newUser = await User.create({
        fullName,email, password: hashedPassword, bio
      });
      //5). generate JWT token
      const token= generateToken(newUser._id);
      res.json({success:true, message:"User created successfully", userData:newUser, token });
    }
     catch (error){
    console.log(error.message);
    res.json({success:false, message: error.message});
  }
}

//Login existing user
export const login = async (req,res)=>{

  try{

    const { email, password } = req.body;
    const userData= await User.findOne({email});
    if (!userData) {
      return res.json({ success: false, message: "Invalid credentials" });
}
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if(!isPasswordCorrect){
      return res.json({success:false, message:"Invalid credentials"});
    }

    const token = generateToken(userData._id);
    const userSafe = userData.toObject();
delete userSafe.password;

res.json({
  success: true,
  message: "Login successful",
  userData: userSafe,
  token
});


  } catch (error){

   console.log(error.message);
    res.json({success:false, message: error.message});

  }
}

//controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({success:true, user:req.user}); 
}

//controller to update user profile details
export const updateProfile = async (req, res) => {
  try{
    const { fullName, bio, profilePic } = req.body;
    const userId=req.user._id;
    let updatedUser;
    if(!profilePic){
     updatedUser= await User.findByIdAndUpdate(userId, {fullName, bio},{new:true});
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(userId, {fullName, bio, profilePic: upload.secure_url}, {new:true});
    }
    res.json({success:true,user: updatedUser})
  } catch(error){
    console.log(error.message);
    res.json({success:false, message: error.message});
  }
}
