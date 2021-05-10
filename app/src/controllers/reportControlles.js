const { report } = require("../routes/reporte");
const request = require('request');
const controller = {};

//metodo para ver la pagina principal
controller.list = (req, res) => {
    //res.send('Metodo para listar reportes');
    res.render('report', {
        data: report
    });

};

//metodo para mostar la vista de lista de resportes
controller.reportes = (req, res) => {
    res.render('reportView', {
        data: report
    });
};

//metodo para mostar la vista de lista de resportes
controller.individual = (req, res) => {
    res.render('individual', {
        data: report
    });
};

//metodo para mostrar la vista de agregar reporte
controller.add = (req, res) => {
    res.render('reportAdd');
};

//metodo para buscar reportes
controller.passSearch = (req, res) => {
    request.get("http://jsonplaceholder.typicode.com/users", (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    });    

};

//metodo para enviar reportes
controller.passSend = (req, res) => {
    request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:8085/ingresar-reporte",
        "body": JSON.stringify({
            "carnet": req.body.carnet,
            "nombre": req.body.nombre,
            "curso": req.body.curso,
            "cuerpo": req.body.cuerpo
        })
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        if(response){
            res.render('reportAdd', {
                mensajeServer: JSON.parse(body).message
            });
        }        
    });
};


//metodo para mostrar la vista de agregar reporte
controller.index = (req, res) => {
    res.render('index', {
        data: report
    });
};

//metodo para mostrar la vista de agregar reporte
controller.about = (req, res) => {
    res.render('about', {
        data: report
    });
};

//metodo para mostrar la vista de agregar reporte
controller.addAsistencia = (req, res) => {
    res.render('asistenciaView');
};

//metodo para enviar reportes
controller.sendAsistencia = (req, res) => {
    res.render('asistenciaView', {
        mensajeServer: 'JSON.parse(body).message'
    });
};

//metodo para mostar la vista de lista de resportes
controller.reportesEvento = (req, res) => {
    res.render('reporteEvento');
};

controller.reporteAlumnos = (req, res) => {
    res.render('reporteAlumno');
};

module.exports = controller;