const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// const authRoute = require("./src/route/auth.route");
// app.use(authRoute);


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

const PORT = 3020;
const DATA_FILE = path.join(__dirname, "data.json");
app.get("/", (req, res) => res.send("Express on Vercel"));

const readData = () => {
  const rawData = fs.readFileSync(DATA_FILE);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get("/items", (req, res) => {
  const data = readData();
  res.json(data);
});

app.post("/items", (req, res) => {
  const data = readData();
  const newItem = {
    id: data.length + 1,
    name: req.body.name,
    status: req.body.name
  };
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

app.put("/items/:id", (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id); // Ambil ID dari parameter URL
  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  data[index] = {
    ...data[index], // Pertahankan data lama
    name: req.body.name || data[index].name, // Update jika ada, jika tidak tetap sama
    status: req.body.status || data[index].status,
  };

  writeData(data); // Simpan perubahan ke file JSON
  res.json(data[index]); // Kirim data yang sudah diperbarui
});

app.delete("/items/:id", (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id);
  data = data.filter((item) => item.id !== id);
  writeData(data);
  res.json({ message: "Item deleted", id });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
