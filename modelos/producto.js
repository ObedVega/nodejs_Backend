//modelo
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let producto = new Schema(
  {
    id: {
      type: String
    }
  },
  { collection: "productos" }
);
module.exports = mongoose.model("producto", producto);
