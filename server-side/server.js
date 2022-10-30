const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

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

//port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is listening on port 5000");
});