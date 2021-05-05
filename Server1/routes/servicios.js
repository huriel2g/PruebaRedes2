const express = require("express");
const router = express.Router();

// agregar
router.post('/agregar', (req, res) => {
    res.send('agregando en server1')
});

// ver
router.get('/ver', (req, res) => {
    res.send('ver en server1')
});

module.exports = router;