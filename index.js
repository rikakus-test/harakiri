const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const testRoute = require("./src/route/test.route");


const app = express();
app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


app.use(express.static(path.join(__dirname, "public")));

app.use(testRoute);

app.get("/", (req, res) => res.send("Express on Vercel"));

const APP_PORT = process.env.PORT || 3003;
app.listen(APP_PORT, () => {
  console.log(`Server running at http://localhost:${APP_PORT}`);
});
