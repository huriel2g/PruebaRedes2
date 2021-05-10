
var PROTO_PATH = __dirname + '/../proto/project.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).proyectoredes;


require('dotenv').config();
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require('../s3');

const mysqlConnection = require('../database');
const { Console } = require('console');

//-----------------------------------------------------
//----------------- LO QUE SE VA USAR -----------------
//-----------------------------------------------------

function ObtenerReportes(call, callback) {
    //console.log(call.request);
    const {carnet} = call.request.carnet;
    console.log("Obtener Reporte Carnet: "+call.request.carnet);
    
    mysqlConnection.query('CALL obtenerReportes(?);', [carnet != '' ? carnet : -1], (err, rows, fields) => {
        if(!err){
            var d = {message: 'Solicitud atendida por el servidor 201114502', data: rows[0]}
            callback(null, {message : JSON.stringify(d)});
        } else{
            console.log(err);
            callback(null, {message: 'No se pudo completar la solicitud!'});     
        }
    });
}

function ObtenerReportesId(call, callback) { 
    console.log("Obtener Reporte Id: "+call.request.id);

    mysqlConnection.query('CALL obtenerReporteIndividual(?);', [call.request.id], (err, rows, fields) => {
        if(!err){
            var d = {message: 'Solicitud atendida por el servidor 201114502', data: rows[0]}
            callback(null, {message : JSON.stringify(d)});
        } else{
            console.log(err);
            callback(null, {message: 'No se pudo completar la solicitud!'});
        }
    });
}

function IngresarReporte(call, callback) { 
    console.log("ingresar reporte: "+entrada)
    
    var entrada = JSON.parse(call.request.entrada);
    const {carnet, nombre, curso, cuerpo} = entrada;
    const query = `
        CALL ingresarReporte(?, ?, ?, ?, ?, ?);
    `;                
    const servidor = "201114502(Servidor)";
    var hoy = new Date();
    const fecha = `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDate()}`;
    mysqlConnection.query(query, [carnet, nombre, curso, servidor, fecha, cuerpo], (err, rows, fields) => {
        if(!err){
            var d = {message: 'Solicitud atendida por el servidor 201114502'}
            callback(null, {message : JSON.stringify(d)});
        } else{
            console.log(err);
            callback(null, {message: 'No se pudo completar la solicitud!'});
        }
    });
}

function ingresarAsistencia(call, callback) {
    var entrada = JSON.parse(call.request.entrada);
    const {carnet, nombre, evento, id_evento} = entrada;
    console.log("ingresar asistencia: "+call.request.entrada)
    const file = call.request.files; //req.files;
    
    const result = uploadFile(file[0]);
    unlinkFile(file[0].path);
    
    const imagen = result.Location;
    
    const query = `
        CALL ingresarAsistencia(?, ?, ?, ?, ?, ?, ?);
    `;                
    const servidor = "201114502(Servidor)";
    var hoy = new Date();
    const fecha = `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDate()}`;
    mysqlConnection.query(query, [carnet, nombre, evento, id_evento, imagen, fecha, servidor], (err, rows, fields) => {
        if(!err){
            var d = {message: 'Solicitud atendida por el servidor 201114502'}
            callback(null, {message : JSON.stringify(d)});
        } else{
            console.log(err);
            callback(null, {message: 'No se pudo completar la solicitud!'});
        }
    });
 }
function ObtenerEvento(call, callback) { 
    console.log("Obtener Evento Id: "+call.request.id);
    mysqlConnection.query('CALL obtenerAsistenciaEvento(?);', [call.request.id], (err, rows, fields) => {
        if(!err){
            var d = {message: 'Solicitud atendida por el servidor 201114502', data: rows[0]}
            callback(null, {message : JSON.stringify(d)});
        } else{
            console.log(err);
            callback(null, {message: 'No se pudo completar la solicitud!'});
        }
    });
}
function ObtenerCarnet(call, callback) { 
    mysqlConnection.query('CALL obtenerAsistenciaCarnet(?);', [call.request.id], (err, rows, fields) => {
        if(!err){
            var d = {message: 'Solicitud atendida por el servidor 201114502', data: rows[0]}
            callback(null, {message : JSON.stringify(d)});
        } else{
            console.log(err);
            callback(null, {message: 'No se pudo completar la solicitud!'});
        }
    });
}




/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, {
        ObtenerReportes     : ObtenerReportes,
        ObtenerReportesId   : ObtenerReportesId,
        IngresarReporte     : IngresarReporte,
        ingresarAsistencia  : ingresarAsistencia,
        ObtenerEvento       : ObtenerEvento,
        ObtenerCarnet       : ObtenerCarnet
    });
  server.bindAsync('0.0.0.0:5000', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}







main();
