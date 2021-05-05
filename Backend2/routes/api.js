const express = require("express");
const router = express.Router();
const conn = require('../conexion');
const axios = require("axios");

// ------------------- CRUD CATEGORIAS -------------------

router.post('/agregar', (req, res) => {
    //res.send(get());
    axios.post('http://localhost:4000/servicios/agregar')
    .then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error){
        console.log(error);
    });

    //res.send('agregar');
});

router.get('/ver', (req, res) => {
    //res.send(get());
    axios.get('http://localhost:4000/servicios/ver')
    .then(function(response){
        console.log(response.data);
        res.send(response.data);
    }).catch(function (error){
        console.log(error);
    });

});


module.exports = router;



