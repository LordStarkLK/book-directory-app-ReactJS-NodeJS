const express = require("express");

const {uploadFile,addBook,getBooks} = require("../controller/controller")

const router = express.Router();

router.post("/addBook",(addBook));
router.post("/uploadFile",(uploadFile));

router.get("/getBooks",(getBooks));

module.exports = router;