import "../src/style/home.css";
import "../src/style/btn.css";
import "../src/style/search.css";
import Popup from "./component/Popup";
import React, { Component, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
  const [btnPopup, setPopupState] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const bookName = data.bookName;
    const description = data.description;
    const authorName = data.authorName;

    const words = data.file[0].name.split('.');
    var fileName = Date.now() +"picture."+words[words.length-1];

    const inputData = {
      bookName,
      description,
      authorName,
      fileName
    };

    const formData = new FormData();
    formData.append("picture", data.file[0]);
    formData.append("name", fileName);

    const res = await fetch("http://localhost:5000/api/v1/settings/uploadFile", {
      method: "POST",
      body: formData
    }).then(res => res.json())

    console.log(formData);
    

    await axios
    .post("http://localhost:5000/api/v1/settings/addBook", inputData)
    .then((response) => {
      console.log('Posting data', response);
      alert("Form successfully submitted");
    }).catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div id="main" className="container canvas">
        <div className="top-row">
          <h1 className="display-6 title-text">Books </h1>
          <div className="search-box">
            <label>
              <input type="search" placeholder="Search" required></input>
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
                  className="dataInputs"
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

        {/* book details card */}
        <div className="book-detail">
          <img
            src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1658847734i/57224204.jpg"
            alt="Book cover"
            width="auto"
            height="290px"
          ></img>
          <div className="text-details">
            <h1 className="book-name">The Seven Moons of Maali Almeida </h1>
            <p>
              Colombo, 1990. Maali Almeida—war photographer, gambler, and closet
              queen—has woken up dead in what seems like a celestial visa
              office. His dismembered body is sinking in the serene Beira Lake
              and he has no idea who killed him. In a country where scores are
              settled by death squads, suicide bombers, and hired goons, the
              list of suspects is depressingly long, as the ghouls and ghosts
              with grudges who cluster round can attest. But even in the
              afterlife, time is running out for Maali. He has seven moons to
              contact the man and woman he loves most and lead them to the
              photos that will rock Sri Lanka.
            </p>
            <div className="btm-row">
              <h2 className="author-name">Shehan Karunatilaka</h2>
              <div className="buttons">
                <button className="button-54 update" role="button">
                  Update
                </button>
                <button className="button-54 delete" role="button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
