import "../src/style/home.css";
import "../src/style/btn.css";
import "../src/style/search.css";

function App() {
  return (
    <div className="App">
      <div id="main" className="container canvas">
        <div className="top-row">
          <h1 className="display-6 title-text">Books </h1>
          <div className="search-box">
            <label>
              <input type="search" placeholder="Search" required></input>
              <ul>
                <li s>s</li>
                <li e>e</li>
                <li a>a</li>
                <li r>r</li>
                <li c>c</li>
                <li h>h</li>
              </ul>
            </label>
          </div>
          <div className="top-btns">
            <button class="button-54 Add" role="button">
              Add
            </button>
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
                <button class="button-54 update" role="button">
                  Update
                </button>
                <button class="button-54 delete" role="button">
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
