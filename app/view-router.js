const express = require('express');
const router = express.Router();

const path = require('path');

const static = path.join(__dirname + '/../static/');

router.get('/login', (req, res) => {
    res.sendFile(path.join(static + 'login.html'));
});

router.get('/main/', (req, res) => {
    res.sendFile(path.join(static + 'main.html'));
});

router.get('/config/', (req, res) => {
    res.sendFile(path.join(static + 'config.html'));
});

module.exports = router;