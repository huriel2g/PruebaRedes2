const express = require('express');
require('dotenv').config();
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require('../s3');
// Manejador de rutas para el servidor
const router = express.Router();


const mysqlConnection = require('../database');

// Obtener todos los usuarios
router.get('/obtener-reportes', (req, res)=>{
    const {carnet} = req.query;
    mysqlConnection.query('CALL obtenerReportes(?);', [carnet != "" ? carnet : -1], (err, rows, fields) => {
        if(!err){
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502'+ data: rows[0]});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});

/*
// Obtener todos los usuarios
router.post('/obtener-reportes-post', (req, res)=>{
    const {carnet} = req.body;
    console.log('----------->',req.body,req.query);
    mysqlConnection.query('CALL obtenerReportes(?);', [carnet != "" ? carnet : -1], (err, rows, fields) => {
        if(!err){
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502', data: rows[0]});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});
*/

// Obtener reporte individual
router.get('/obtener-reporte/:id', (req, res)=>{
    mysqlConnection.query('CALL obtenerReporteIndividual(?);', [req.params.id], (err, rows, fields) => {
        if(!err){
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502', data: rows[0]});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});

// Ingresar un reporte 
router.post('/ingresar-reporte', (req, res)=>{
    const {carnet, nombre, curso, cuerpo} = req.body;
    const query = `
        CALL ingresarReporte(?, ?, ?, ?, ?, ?);
    `;                
    const servidor = "201114502(Servidor)";
    var hoy = new Date();
    const fecha = `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDate()}`;
    mysqlConnection.query(query, [carnet, nombre, curso, servidor, fecha, cuerpo], (err, rows, fields) => {
        if(!err){
            //console.log(rows[0].id_usuario);
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502'});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});


// Ingresar un reporte 
router.post('/ingresar-asistencia', upload.array("files"), async (req, res)=>{
    const {carnet, nombre, evento, id_evento} = req.body;
    const file = req.files;
    
    const result = await uploadFile(file[0]);
    await unlinkFile(file[0].path);

    const imagen = result.Location;
    
    const query = `
        CALL ingresarAsistencia(?, ?, ?, ?, ?, ?, ?);
    `;                
    const servidor = "201114502(Servidor)";
    var hoy = new Date();
    const fecha = `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDate()}`;
    mysqlConnection.query(query, [carnet, nombre, evento, id_evento, imagen, fecha, servidor], (err, rows, fields) => {
        if(!err){
            //console.log(rows[0].id_usuario);
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502'});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});

// Obtener reporte individual
router.get('/obtener-evento/:id', (req, res)=>{
    mysqlConnection.query('CALL obtenerAsistenciaEvento(?);', [req.params.id], (err, rows, fields) => {
        if(!err){
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502', data: rows[0]});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});

// Obtener reporte individual
router.get('/obtener-carnet/:id', (req, res)=>{
    mysqlConnection.query('CALL obtenerAsistenciaCarnet(?);', [req.params.id], (err, rows, fields) => {
        if(!err){
            res.status(200).send({message: 'Solicitud atendida por el servidor 201114502', data: rows[0]});
        }
        else{
            console.log(err);
            res.status(400).send({message: 'No se pudo completar la solicitud!'});
        }
    });
});

module.exports = router;