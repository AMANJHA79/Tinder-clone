const express = require("express");
const router = express.Router();
const {signup,login,logout} = require("../controller/auth-controller");
const {protectedRoute} = require("../middleware/Auth-middleware");

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.get('/me', protectedRoute, (req,res) => {
    res.status(200).json({
        success:true,
        user:req.user
    })
});






module.exports = router;