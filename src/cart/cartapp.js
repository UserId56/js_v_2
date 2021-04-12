const http = require("http")

http.createServer((request, response) => {
    console.log(request)
}).listen(3000)