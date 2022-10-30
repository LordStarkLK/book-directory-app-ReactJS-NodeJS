const express = require("express");

const {uploadFile,addBook,getBooks,deleteData,updateData} = require("../controller/controller")

const router = express.Router();

router.post("/addBook",(addBook));
router.post("/uploadFile",(uploadFile));

router.get("/getBooks",(getBooks));

router.delete("/deleteData/:id",(deleteData));

router.put("/updateData/:id",(updateData));

module.exports = router;