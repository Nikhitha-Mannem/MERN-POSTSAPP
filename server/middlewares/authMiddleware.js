const {verify}=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET;

const ValidateUser= async (req,res,next)=>{
    
    const accessToken=req.header("accessToken");
    if(!accessToken){
        res.json({Error:"User not Logged IN"});
    }
    else{
        const ValidUser= await verify(accessToken,secretKey);
        if(!ValidUser){
            res.json({Error:"Not a Valid User"});


        }else{
            
            req.user=ValidUser;
            
            next();
        }

    }
}

module.exports=ValidateUser;