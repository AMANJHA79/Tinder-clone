const User = require("../models/user-model");


const signup = async (req, res) => {
    try{
        res.send("signup routes");
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const login = async (req, res) => {
    try{
        res.send("login routes");
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const logout = async (req, res) => {
    try{
        res.send("logout routes");
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        res.send("forgot password routes");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        res.send("reset password routes");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}



module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword
};

