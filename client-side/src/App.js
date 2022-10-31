import "../src/style/home.css";
import "../src/style/btn.css";
import "../src/style/search.css";
import Popup from "./component/Popup";
import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import BookDetails from "./component/BookDetails";

function App() {
  const [btnPopup, setPopupState] = useState(false);

  //search function
  const [searchTerm, setSearchTerm] = useState("");

  //getting existing data
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    await axios
      .get("http://localhost:5000/api/v1/settings/getBooks")
      .then((response) => {
        setBookData(response.data);
      })
      .catch((err) => console.log(err));
  };

  //form submitting
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const bookName = data.bookName;
    const description = data.description;
    const authorName = data.authorName;

    const words = data.file[0].name.split(".");
    var fileName = Date.now() + "picture." + words[words.length - 1];

    const inputData = {
      bookName,
      description,
      authorName,
      fileName,
    };

    const formData = new FormData();
    formData.append("picture", data.file[0]);
    formData.append("name", fileName);

    const res = await fetch(
      "http://localhost:5000/api/v1/settings/uploadFile",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    console.log(formData);

    await axios
      .post("http://localhost:5000/api/v1/settings/addBook", inputData)
      .then((response) => {
        console.log("Posting data", response);
        alert("Form successfully submitted");
        refreshPage();
      })
      .catch((err) => console.log(err));
  };

  console.log(bookData);
  bookData.map((e) => console.log(e));

  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="App">
      <div id="main" className="container canvas">
        <div className="top-row">
          <h1 className="display-6 title-text">Books </h1>
          <div className="search-box">
            <label>
              <input
                type="search"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              ></input>
            </label>
          </div>
          <div className="top-btns">
            <button
              class="button-54 Add"
              role="button"
              onClick={() => setPopupState(true)}
            >
              Add
            </button>
            <Popup trigger={btnPopup} setTrigger={setPopupState}>
              <form onSubmit={handleSubmit(onSubmit)} className="dataInputForm">
                <input
                  className="dataInputs"
                  type="text"
                  placeholder="Name"
                  {...register("bookName", { required: true })}
                />
                <textarea
                  className="dataInputs textArea"
                  type="textare"
                  placeholder="Description"
                  {...register("description", { required: true })}
                />
                <input
                  className="dataInputs"
                  type="text"
                  placeholder="Author"
                  {...register("authorName", { required: true })}
                />
                <input
                  className="dataInputs"
                  type="file"
                  {...register("file")}
                />
                <button type="submit" className="button-54 update">
                  Submit
                </button>
              </form>
            </Popup>
          </div>
        </div>

        {bookData.filter((val)=>{
          if(searchTerm==""){
            return val;
          }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return val;
          }
        }).map((e) => (
          <BookDetails data={e} />
        ))}
      </div>
    </div>
  );
}

export default App;
