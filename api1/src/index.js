const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./api');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use('', indexRoutes);
app.use('/', apiRoutes);

app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));