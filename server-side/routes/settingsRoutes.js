const express = require("express");

const {uploadFile,addBook,getBooks,deleteData} = require("../controller/controller")

const router = express.Router();

router.post("/addBook",(addBook));
router.post("/uploadFile",(uploadFile));

router.get("/getBooks",(getBooks));

router.delete("/deleteData/:id",(deleteData));

module.exports = router;