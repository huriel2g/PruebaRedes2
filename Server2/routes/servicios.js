const express = require("express");
const router = express.Router();

// agregar
router.post('/agregar', (req, res) => {
    res.send('agregando en server2')
});

// ver
router.get('/ver', (req, res) => {
    res.send('ver en server2')
});

module.exports = router;