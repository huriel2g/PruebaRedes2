'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Constants
const PORT = process.env.PUERTO_SERVICIO1;
const HOST = process.env.HOST_SERVICIO1;
const IP_BASE_DE_DATOS = process.env.IP_BASE_DE_DATOS;

// App
const app = express();

// CORS
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use(require('./routes/usuario'));

app.get('/', (req, res) => {
  res.send('Hola mundo desde el Server1!');
});

app.listen(PORT, HOST);
console.log(`Running Server1 on http://${HOST}:${PORT}`);