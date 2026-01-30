const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");

const deviceRoute = require("./src/route/device.route");
const homeRoutes = require("./src/route/home.route");
const usersRoutes = require("./src/route/users.route");
const arduinoRoutes = require("./src/route/arduino.route");
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

app.use(deviceRoute);
app.use(usersRoutes);
app.use(homeRoutes);
app.use(arduinoRoutes);
app.get("/", (req, res) => res.send("Express on"));

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
