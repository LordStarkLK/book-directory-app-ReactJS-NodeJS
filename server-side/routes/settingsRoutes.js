const express = require("express");

const {uploadFile,addBook} = require("../controller/controller")

const router = express.Router();

router.post("/addBook",(addBook));
router.post("/uploadFile",(uploadFile));

module.exports = router;