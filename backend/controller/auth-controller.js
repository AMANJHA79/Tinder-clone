const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const signup = async (req,res) => {
    const { name , email,password,age,gender,genderPreference} = req.body;

    try{
        if(!name || !email || !password || !age || !gender || !genderPreference){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            age,
            gender,
            genderPreference
        });

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("jwt",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success:true,
            message:"User created successfully",
            user
        })
    }
    catch(error){
        console.error("Signup error:", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}

const login = async (req,res) => {
    const {email,password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("jwt",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success:true,
            message:"Login successful"
        })
    }
    catch(error){
        console.error("Login error:", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

const logout = async (req,res) => {
    res.clearCookie("jwt");
    return res.status(200).json({
        success:true,
        message:"Logout successful"
    })
}



module.exports = {
    signup,
    login,
    logout
};
