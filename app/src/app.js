const express = require ('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const app = express();

//import routes
const reportsRoutes = require('./routes/reporte');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//rutas
app.use('/', reportsRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

//comenzando servidor
app.listen(app.get('port'), ()=> {
    console.log('Server on port 3000');
});