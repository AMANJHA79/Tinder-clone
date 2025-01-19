const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const protectedRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"});
        }

        const currentUser = await User.findById(decoded.userId);


        req.user = currentUser;
        next();

    }
    catch(error){
        console.log('error in protected route',error);
        if(error instanceof jwt.JsonWebTokenError){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

module.exports = {protectedRoute};