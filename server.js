const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

const serve = serveStatic(`${__dirname}/dist`, { index: 'index.html' });

const server = http.createServer((request, response) => {
  serve(request, response, finalhandler(request, response));
});

server.listen(3000);
