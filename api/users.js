const express = require("express");
const router = express.Router();
const path = require('path');

//routes
router.get('/nigeria',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public/nigeria.html'));
});

router.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/about.html'));
});	
	

module.exports = router