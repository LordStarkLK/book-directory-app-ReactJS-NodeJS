import React from "react";
import "../style/home.css";
import "../style/btn.css";
import "../style/search.css";

function BookDetails(props) {
  return (
    <div>
      {/* book details card */}
      <div className="book-detail">
        <img
          src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1658847734i/57224204.jpg"
          alt="Book cover"
          width="auto"
          height="290px"
        ></img>
        <div className="text-details">
          <h1 className="book-name">{props.data.name} </h1>
          <p>
          {props.data.description}
          </p>
          <div className="btm-row">
            <h2 className="author-name">{props.data.author}</h2>
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
  );
}

export default BookDetails;
