const http = require('http');

http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if(req.url === '/product'){
        res.end(JSON.stringify({
            product: 'Products'
        }))
    }
    if(req.url === '/user'){
        res.end(JSON.stringify({
            user: 'Users'
        }))
    }
    res.end(JSON.stringify({
        home: 'HomePage'
    }))
}).listen(4001,()=> console.log('Server is running'));   

