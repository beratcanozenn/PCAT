const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Photo = require("./models/Photo");

const app = express();
// DB Connect
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  const photos = await Photo.find({});

  res.render("index", { photos });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  const { title, description, image } = req.body;
  const photo = new Photo({
    title,
    description,
    image,
  });

  await photo
    .save()
    .then((photo) => console.log("Veri başarıyla eklendi :"))
    .catch((err) => console.log("Veri eklerken Hata oluştu : " + err));

  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
