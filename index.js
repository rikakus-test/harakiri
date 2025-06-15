const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const testRoute = require("./src/route/test.route");
const homeRoutes = require("./src/route/home.route");
const usersRoutes = require("./src/route/users.route");
const arduinoRoutes = require("./src/route/arduinos.route");
const swaggerUi = require("swagger-ui-express");
const swaggerdocs = require("./src/swagger.apidocs.json");


const app = express();
app.use(bodyParser.json());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerdocs));

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});


app.use(express.static(path.join(__dirname, "public")));

app.use(testRoute);
app.use(usersRoutes);
app.use(homeRoutes);
app.use(arduinoRoutes);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(process.env.PORT || 80, "0.0.0.0" );
