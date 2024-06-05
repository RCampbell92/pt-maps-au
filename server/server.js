const express = require("express");
const mongoose = require("mongoose");
const Region = require("./models/Region");
const bodyParser = require("body-parser");
const app = express();
require("dotenv/config");
let cors = require("cors");

app.use(cors());

const port = process.env.PORT || 4000;

// connect to mongoDB
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    app.listen(port);
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// enter regions page
app.get("/enter-regions", (req, res) => {
  res.render("enter_regions");
});

// Return regions schema
app.get("/regions", async (req, res) => {
  /*Region.find()
    .then((result) => {
      res.send({ regions: result });
    })
    .catch((err) => {
      console.log(err);
    });*/

  const regions = Region;
  const regionData = await regions.find({}).exec();
  if (regionData) {
    res.send(JSON.stringify(regionData));
  }
});

app.get("/regions/:id", (req, res) => {
  Region.regions.find().then((result) => {
    res.json({ regions: result });
  });
});

// enter regions into DB
app.post("/posted-region", (req, res) => {
  const region = new Region(req.body);

  region
    .save()
    .then((result) => {
      res.redirect("/enter-regions");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port + "1", () => {
  console.log("Server started on port ", port);
});
