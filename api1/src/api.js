const express = require("express");
var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const { Console } = require("console");

var PROTO_PATH = __dirname + '/../proto/project.proto';
const IP = '10.0.30.212'
const IP_SERVER = IP + ':5000';
const router = express.Router();

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var grpc_proto = grpc.loadPackageDefinition(packageDefinition).proyectoredes;



// ------------------- CRUD CATEGORIAS -------------------

router.post('/agregar', (req, res) => {
  res.send('agregarDatos');
});

router.get('/obtener-reportes', (req, res) => {

  var client = new grpc_proto.Greeter(IP_SERVER, grpc.credentials.createInsecure());
  var carnet_in = req.query.carnet;
  console.log("Obtener reportes: "+carnet_in);
   
  client.ObtenerReportes({carnet: carnet_in}, function (err, response) {
    console.log(carnet_in);
    res.send(JSON.parse (response.message));
  });

});

router.get('/obtener-reporte/:id', (req, res)=>{
  var client = new grpc_proto.Greeter(IP_SERVER, grpc.credentials.createInsecure());
  //var id_in = req.params.id;
  //console.log("Obtener reportes Id: "+id_in);
   
  client.ObtenerReportesId({id: req.params.id}, function (err, response) {
    console.log(req.params.id);
    res.send(JSON.parse (response.message));
  });
});

router.post('/ingresar-reporte', (req, res)=>{
  const {carnet, nombre, curso, cuerpo} = req.body;
  let datos = {'carnet': carnet, 'nombre': nombre, 'curso': curso, 'cuerpo': cuerpo}
  
  var client = new grpc_proto.Greeter(IP_SERVER, grpc.credentials.createInsecure());
  client.IngresarReporte({entrada: JSON.stringify(datos)}, function (err, response) {
    console.log("ingresar reporte: "+JSON.stringify(datos));
    res.send(JSON.parse(response.message));
  });
});

router.post('/ingresar-asistencia', (req, res)=>{
  const {carnet, nombre, evento, id_evento} = req.body;
  let datos = {'carnet': carnet, 'nombre': nombre, 'evento': evento, 'id_evento': id_evento}
  var client = new grpc_proto.Greeter(IP_SERVER, grpc.credentials.createInsecure());
  client.IngresarAsistencia({entrada: JSON.stringify(datos)}, function (err, response) {
    console.log("ingresar reporte: "+JSON.stringify(datos));
    res.send(JSON.parse(response.message));
  });
});

router.get('/obtener-evento/:id', (req, res)=>{
  var client = new grpc_proto.Greeter(IP_SERVER, grpc.credentials.createInsecure());
   
  client.ObtenerEvento({id: req.params.id}, function (err, response) {
    console.log("Obtener evento Id: "+req.params.id);
    res.send(JSON.parse (response.message));
  });

});

router.get('/obtener-carnet/:id', (req, res)=>{
  var client = new grpc_proto.Greeter(IP_SERVER, grpc.credentials.createInsecure());
   
  client.ObtenerCarnet({id: req.params.id}, function (err, response) {
    console.log("Obtener evento Id: "+req.params.id);
    res.send(JSON.parse (response.message));
  });
});


module.exports = router;



