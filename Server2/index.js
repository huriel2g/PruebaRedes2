const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const servicesRoutes = require('./routes/servicios');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use('', indexRoutes);
app.use('/servicios', servicesRoutes);

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));