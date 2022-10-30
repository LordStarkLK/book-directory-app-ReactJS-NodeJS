import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../style/home.css";
import "../style/btn.css";
import "../style/search.css";
import axios from "axios";
import Popup from "./../component/Popup";


function BookDetails(props) {
  const [btnPopup, setPopupState] = useState(false);

    //form submitting
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
      const bookName = data.bookName;
      const description = data.description;
      const authorName = data.authorName;
      const fileName = props.data.image;
  
      const inputData = {
        bookName,
        description,
        authorName,
        fileName
      };
  
      const formData = new FormData();
      formData.append("picture", data.file[0]);
      formData.append("name", props.data.image);

      
      const res = await fetch("http://localhost:5000/api/v1/settings/uploadFile", {
        method: "POST",
        body: formData
      }).then(res => res.json())
      
  
      axios
        .put("http://localhost:5000/api/v1/settings/updateData/" + props.data.id, inputData)
        .then((response) => {
          refreshPage();
        }).catch((err) => console.log(err));
      ;
    };

  const userPicture = "http://localhost:5000/images/" + props.data.image;

  const deleteData = async () => {
    await axios
      .delete(
        "http://localhost:5000/api/v1/settings/deleteData/" + props.data.id
      )
      .then((response) => {
        refreshPage();
      })
      .catch((err) => console.log(err));
  };

  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      {/* book details card */}
      <div className="book-detail">
        <img
          src={userPicture}
          alt="Book cover"
          width="auto"
          height="290px"
        ></img>
        <div className="text-details">
          <h1 className="book-name">{props.data.name} </h1>
          <p>{props.data.description}</p>
          <div className="btm-row">
            <h2 className="author-name">{props.data.author}</h2>
            <div className="buttons">
              <button
                class="button-54 Add"
                role="button"
                onClick={() => setPopupState(true)}
              >
                Update
              </button>
              <Popup trigger={btnPopup} setTrigger={setPopupState}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="dataInputForm"
                >
                  <input
                    className="dataInputs"
                    type="text"
                    defaultValue={props.data.name}
                    {...register("bookName", { required: true })}
                  />
                  <textarea
                    style={{height:200}}
                    className="dataInputs"
                    type="textare"
                    defaultValue={props.data.description}
                    {...register("description", { required: true })}
                  />
                  <input
                    className="dataInputs"
                    type="text"
                    defaultValue={props.data.author}
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
              <button
                onClick={() => {
                  deleteData();
                }}
                type="submit"
                className="button-54 delete"
                role="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
