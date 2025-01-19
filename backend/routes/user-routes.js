const express = require("express");
const router = express.Router();
const {protectedRoute} = require("../middleware/Auth-middleware");
const {updateProfile} = require("../controller/user-controller");
const cloudinary = require("../config/cloudinary-config");

router.put('/update',protectedRoute,updateProfile);


module.exports = router;