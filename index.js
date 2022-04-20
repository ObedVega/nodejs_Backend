const mongoose = require("mongoose");
const express = require("express");
const app = express();
const productos = require("./modelos/productos");
const delProducto = require("./modelos/deleteProducto");
const router = express.Router();
const port = process.env.PORT || 5000;

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

//http://localhost:4000/insProducts?id=01&url=02&cat=03&name=04&price=05&desc=06
//http://localhost:4000/insProducts?id=02&url=https://images.boardriders.com/globalGrey/rvca-products/all/default/medium-large/m1031rct_rvca,f_blk_frt1.jpg&cat=Shorts&name=CURREN BOARDSHORTS 18&price=9.99&desc=06
app.post('/insProducts', (req, res) => {
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

//http://localhost:4000/delProduct?id=02
app.delete('/delProduct', (req, res) => {
    const p_id = req.query.id; 
    const data = [{
        id: p_id
      }];

    if(p_id!=''){
        delProducto.deleteOne(data, function(err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }); 
    }else{
        res.send('id incorrecto');
    }
})
