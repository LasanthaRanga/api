const fs = require('fs');
const app = require('./app');
const http = require('http');
//const https = require('https');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);