const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionSchema = new Schema({
  region_name: { type: String, required: true },
  img_src: { type: String, required: true },
  population: { type: Number, required: true },
  track_length: { type: Number, required: false },
  num_stops: { type: Number, required: false },
  max_frequency: { type: Number, required: false },
  max_frequency_lines: { type: String, required: false },
});

const Region = mongoose.model("Regions", regionSchema, "regions");
module.exports = Region;
