const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const knexConfig = require("./utils/knexfile");
const { Model } = require("objection");
require("dotenv").config();

const app = express();
const port = process.env.NODE_PORT;
const host = process.env.NODE_HOST;

// var corsOption = { origin: ["http://c880-93-51-213-243.ngrok.io/", "http://localhost:9000"] };
// app.use(cors(corsOption));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const environment = knex(process.env.NODE_ENV === "production" ? knexConfig.production : knexConfig.development);
Model.knex(environment);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/", require("./routes/users"));
app.use("/", require("./routes/projects"));
app.use("/", require("./routes/comments"));
app.use("/", require("./routes/objects"));
app.use("/", require("./routes/threeCalculations"));

app.listen(port, host, () => {
  console.log(`App listening at http://${host}:${port}`);
});
