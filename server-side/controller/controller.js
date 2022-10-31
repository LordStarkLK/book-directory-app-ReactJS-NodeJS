const asyncHandler = require("express-async-handler");
const fileUpload = require("express-fileupload");
const { StatusCodes } = require("http-status-codes");

const express = require("express");
const cors = require("cors");

const app = express();

var mysql = require("mysql");
var connection = mysql.createPool({
  connectionLimit: 10,
  host: "sql238.main-hosting.eu",
  user: "u117929562_user",
  password: "Password#2022",
  database: "u117929562_books",
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


//delete data
const deleteData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  connection.query(
    `DELETE FROM books WHERE id=${id}`,
    function (error, results) {
      if (error) throw error;

      res.json(results);
    }
  );
});

//update data
const updateData = asyncHandler(async (req, res) => {
  const { bookName, description, authorName, fileName } = req.body;
  const id = req.params.id;
  connection.query(
    `UPDATE books SET name='${bookName}', description='${description}', author='${authorName}',image='${fileName}' WHERE id='${id}'`,
    function (error,results) {
      if (error) throw error;
      res.status(StatusCodes.CREATED).json(results);
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
  getBooks,
  deleteData,
  updateData
};