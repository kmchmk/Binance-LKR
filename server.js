
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const hostname = process.env.HOST_NAME =! undefined ? process.env.HOST_NAME :`${process.env.PROJECT_DOMAIN}.glitch.me`
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});