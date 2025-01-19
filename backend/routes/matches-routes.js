const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("matches routes");
});

module.exports = router;