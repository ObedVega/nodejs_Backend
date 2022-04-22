//modelo
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let producto = new Schema(
  {
    id: {
      type: String
    },
    img_url: {
      type: String
    },
    categoria: {
      type: String
    },
    name: {
      type: String 
    },
    price: {
      type: String
    },
    descripcion: {
      type: String
    }
  },
  { collection: "productos" }
);
module.exports = mongoose.model("productos", producto);
