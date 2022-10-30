const asyncHandler = require("express-async-handler");
const fileUpload = require("express-fileupload");
const { StatusCodes } = require("http-status-codes");

const express = require("express");
const cors = require("cors");

const app = express();

var mysql = require("mysql");
var connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "book_directory",
});

//get existing book details
const getBooks = asyncHandler(async (req, res) => {

  connection.query(
    `SELECT * FROM books`,
    function (error, results, fields) {
      if (error) throw error;

      res.json(results);
    }
  );
});

//add a book to library
const addBook = asyncHandler(async (req, res) => {
  const { bookName, description, authorName, fileName } = req.body;

  connection.query(
    `INSERT INTO books(name, description, author, image) 
    VALUES ("${bookName}","${description}","${authorName}","${fileName}")`,
    function (error) {
      if (error) throw error;

      const returnData = {
        bookName,
        description,
        authorName,
        fileName,
      };

      res.status(StatusCodes.CREATED).json(returnData);
    }
  );
});

//file upload function
app.use(fileUpload({
    createParentPath: true
  }))
  
  const uploadFile = app.post("/uploadFile", async (req, res) => {
    try {
      if(!req.files){
        res.send({
          status: false,
          message: "No files"
        })
      } else {
        const {picture} = req.files;
        var name = req.body.name;
  
        picture.mv("./public/images/" + name)
  
        res.send({
          status: true,
          message: "File is uploaded"
        })
      }
    } catch (e) {
      res.status(500).send(e)
    }
  })

module.exports = {
  uploadFile,
  addBook,
  getBooks
};
