/**
 * Loading requirements
 */

const express = require('express');
const app = express();

const bp = require('body-parser');

const PORT = process.env.NODE_HAPROXY_PORT || 8008;

const utils = require('./app/utils.js');

/**
 * Checking if mandatory environnement variable are set
 */

utils.checkEnvVar('NODE_HAPROXY_MONGO_URL');
utils.checkEnvVar('NODE_HAPROXY_SOCK_FILE');
utils.checkEnvVar('NODE_HAPROXY_USER');
utils.checkEnvVar('NODE_HAPROXY_PASS');

/**
 * Loading app modules
 */

/**
 * Loading express.js configuration and routing
 */

const apiRouter = require('./app/api-router.js');
const viewRouter = require('./app/view-router.js');

app.use(bp.json());
app.use(express.static('static'));

app.use('/api/', apiRouter);
app.use('/', viewRouter);

/**
 * Starting express.js
 */

app.listen(PORT, () => {
    console.log(`Listening on :${PORT}`);
});