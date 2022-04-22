const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let usuario = new Schema(
  {
    name: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    cpassword: {
        type: String
    }
  },
  { collection: "usuarios" }
);
module.exports = mongoose.model("usuarios", usuario);
