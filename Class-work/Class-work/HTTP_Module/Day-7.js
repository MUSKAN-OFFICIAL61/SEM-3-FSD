//create your own server using HTTP module
// const http = require('http');
import http from "http";
const server = http.createServer((req,resp)=>{
    resp.writeHead(200, {"Content-Type":"text/html"});
    resp.write('Hello WORLD');
    resp.write("<h1>Welcome to my server</h1>");
    resp.end();
});
server.listen(8000,()=>{
    console.log('server is running on port: 8000');
});