import React from "react";
import "../style/home.css";
import "../style/btn.css";
import "../style/search.css";
import axios from "axios";

function BookDetails(props) {

  const userPicture = "http://localhost:5000/images/" + props.data.image;

  const deleteData = async () => {
    await axios
    .delete("http://localhost:5000/api/v1/settings/deleteData/"+props.data.id)
    .then((response) => {
      refreshPage();
    }).catch((err) => console.log(err));
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
              <button className="button-54 update" role="button">
                Update
              </button>
                <button onClick={()=>{deleteData()}} type="submit" className="button-54 delete" role="button">
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
