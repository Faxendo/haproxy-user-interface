const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.NODE_HAPROXY_MONGO_URL, {useNewUrlParser: true});

module.exports = client;