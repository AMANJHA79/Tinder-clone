const express = require("express");
const router = express.Router();
const {signup,login,logout,forgotPassword,resetPassword} = require("../controller/auth-controller");


router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password',resetPassword);








module.exports = router;