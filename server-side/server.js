const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

// routes
const settingsRouter = require("./routes/settingsRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//Print images on frontend

app.use(express.static('public'));

// routes
app.use("/api/v1/settings", settingsRouter);

//Print images on frontend
app.use(express.static('public'));

//connect front end
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(exress.static('client/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

//port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is listening on port 5000");
});