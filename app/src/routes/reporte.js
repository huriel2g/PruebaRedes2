const express = require('express');
const router = express.Router();

const reportController = require('../controllers/reportControlles');

router.get('/', reportController.index);
router.get('/about', reportController.about);
router.get('/add', reportController.add);   //Ingresar Reporte


//router.get('/', reportController.list);
router.get('/reportes', reportController.reportes);
router.get('/passSearch', reportController.passSearch);
router.post('/passSend', reportController.passSend);
router.post('/add', reportController.add); 

// Reporte Individual
router.get('/individual', reportController.individual);

// Modulo Asistencia
router.get('/addAsistencia', reportController.addAsistencia);   //Ingresar Reporte
router.post('/sendAsistencia', reportController.sendAsistencia);
router.get('/reportesEvento', reportController.reportesEvento);
router.get('/reporteAlumnos', reportController.reporteAlumnos);

//router.post('/passSend', reportController.passSend);
module.exports = router;