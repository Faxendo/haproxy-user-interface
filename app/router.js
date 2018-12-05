const express = require("express");
const router = express.Router();

const HAProxy = require("haproxy");

const ha = new HAProxy(process.env.NODE_HAPROXY_SOCK_FILE);

const mongoClient = require("./mongo.js");

mongoClient.connect(() => {
    console.log(`MongoClient connected`);
});

router.get('/', (req, res) => {
    ha.info((err, info) => {
        console.error(err);
        console.log(info);
        res.send(info);
    });
});

module.exports = router;