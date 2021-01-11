const mongoose = require("mongoose");
const express = require("express");
const app = express();
const usuarios = require("./modelos/model");
const router = express.Router();
const port = 4000;

var uri = "mongodb+srv://ovega:ovegaD3v@cluster0.pjijh.mongodb.net/CRUD-Ex?retryWrites=true&w=majority";
//var uri = "mongodb://localhost:27017/kennel";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router);

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});


router.route("/insertUser").post(function(req, res) {

    var nombre = req.query.name; 
    var apellido = req.query.lname; 
    var uEmail =req.query.email; 
    var password = req.query.pass; 
    var cPassword =req.query.cpass;

    var data = [{
        name: nombre,
        lastname: apellido,
        email: uEmail,
        password: password,
        cpassword: cPassword
      }];

    usuarios.create(data, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            res.send(result);
        }
    });
});

router.route("/findUser").get(function(req, res) {

    var email = req.query.email;
    var password = req.query.pass;
    console.log("email: "+email);
    console.log("pass: "+password);
    var findUser = { "email": email, "password": password }
    //usuarios.findOne({"email": email}, function(err, result) {});
    usuarios.findOne(findUser, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });    
});