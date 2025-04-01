const bcrypt=require('bcrypt');
const User=require('../models/User');
const {sign}=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET;

exports.addUser=async (req,res,next)=>{
    const {username,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10)
    await User.create({username:username,password:hashedPassword});
    res.send("User Registered Successfully....")



}

exports.loginUser=async (req,res,next)=>{
    const {username,password}=req.body;
    const user=await User.findOne({where:{
        username:username
    }})
    if(!user) {
        res.json({Error:"User not Found.."})}
    else{
        const authorized=await bcrypt.compare(password,user.password);
        if(!authorized){
            res.json({Error:"Invalid Credentials"});
        }
        else{
            
            const accessToken=sign({username:user.username,id:user.id},secretKey);
            res.json({accessToken:accessToken});
        }

}

    
}

exports.getUserDetails=async (req,res,next)=>{
    console.log("User Details Controller...");
    const username=req.user.username;
    const userDetails=await User.findOne({where:{username:username},attributes:{exclude:['password']}});
    res.json({userDetails:userDetails})

}