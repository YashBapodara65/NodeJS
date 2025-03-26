const http = require('http');
const port = 9571;

const portHandler = (req,res) => {
    res.write(`<h1>Server started on port is :- ${port}</h1>`);
    res.end();
}

const server = http.createServer(portHandler);

server.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port is :- ",port);
});