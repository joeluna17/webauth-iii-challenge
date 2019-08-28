const server = require('./routers/server');

const port = process.env.PORT || 5000;

server.listen(port, () =>{
    console.log(`*** Magic Man on port: ${port}`);
});