const mongoose = require("mongoose");
const express = require("express");
const app = express();
const productos = require("./modelos/productos");
const usuarios = require("./modelos/usuarios");
const delProducto = require("./modelos/deleteProducto");
const router = express.Router();
const port = process.env.PORT || 5000;

/** DB Connection */
const uri = "mongodb+srv://ovega:ovegaD3v@cluster0.pjijh.mongodb.net/CRUD-Ex?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** Decode Form URL Encoded data */
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('hello world')
})


//http://localhost:4000/getProducts
app.get('/getProducts', (req, res) => {
    productos.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    }); 
})

//http://localhost:4000/getProducto/id
app.get('/getProducto', (req, res) => {
    const p_id = req.query.id; 

    productos.find({}).where('id').equals(p_id).exec(function(err, result){
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//Busquedas
app.get('/search', (req, res) => {
    const param_text =  req.query.text  ; 
    param_text + '$';
    productos.find({
        $or:[
            {name: { $regex: param_text, $options: 'i' }},
            {descripcion: { $regex: param_text, $options: 'i' }}
        ]
    },function(err, result){    
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})

//Inserta Productos
app.get('/insProducts', (req, res) => {
    const p_id = req.query.id; 
    const p_img_url = req.query.url; 
    const p_categoria =req.query.cat; 
    const p_name = req.query.name; 
    const p_price = req.query.price;
    const p_descripcion = req.query.desc;

    const data = [{
        id: p_id,
        img_url: p_img_url,
        categoria: p_categoria,
        name: p_name,
        price: p_price,
        descripcion: p_descripcion
      }];

      if(p_id!='' && p_name!=''){
        productos.create(data, function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(result);
                res.send(result);
            }
        });
      }
})

//http://localhost:5000/delProduct?id=06
app.delete('/delProduct', (req, res) => {
    const p_id = req.query.id; 

    if(p_id!=''){
        delProducto.deleteOne({ id: p_id }, function(err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(result);
                res.send({"resultado":"Registro Eliminado"});
            }
        }); 
    }
})

//http://localhost:5000/update?
app.delete('/update', (req, res) => {
    const p_id = req.query.id; 

    if(p_id!=''){
        delProducto.deleteOne({ id: p_id }, function(err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(result);
                res.send({"resultado":"Registro Eliminado"});
            }
        }); 
    }
})

//######

//http://localhost:5000/usuario?n=obed&e=vega.obed@gmail.com&p=holamundo1
app.post('/usuario', (req, res) => {
    const p_name = req.query.n; 
    const p_email = req.query.e; 
    const p_pass = req.query.p; 
    
    const data = [{
        name: p_name,
        lastname:"",
        email: p_email,
        password: p_pass,
        cpassword:""
      }];

    usuarios.create(data, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result);
            //res.send({"resultado":"Exito"});
            res.end;
        }
    });
})