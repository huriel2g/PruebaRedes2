const mysql = require('mysql');
require('dotenv').config();

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST_BASE_DE_DATOS,
    port: process.env.PUERTO_BASE_DE_DATOS,
    user: process.env.USER_BASE_DE_DATOS,
    password: process.env.PASSWORD_BASE_DE_DATOS,
    database: process.env.NOMBRE_BASE_DE_DATOS,
    multipleStatements: true
});

mysqlConnection.connect(function (err){
    if(err){
        console.error(err);
        return;
    }
    else{
        console.log('Conexión exitosa!');
    }
});

module.exports = mysqlConnection;