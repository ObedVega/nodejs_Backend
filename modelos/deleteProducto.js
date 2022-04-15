//modelo
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let delProducto = new Schema(
  {
    id: {
      type: String
    }
  },
  { collection: "productos" }
);
module.exports = mongoose.model("delProducto", delProducto);
