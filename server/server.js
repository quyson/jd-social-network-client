const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");

const dbURI = process.env.dbURI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Connected to DB"))
  .catch((error) => console.log(error))
  .then((result) => app.listen(8000));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());
require("./config/passport");

app.use(apiRouter);
