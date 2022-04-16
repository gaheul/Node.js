const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => { //listen : 클라이언트한테 응답메세지를 보내줌
  console.log(`Server running at http://${hostname}:${port}/`);
});