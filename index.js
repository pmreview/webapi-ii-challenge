const express = require('express');
const postRouter = require("./post-router");
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("Server Alive")
})

server.use('/api/posts', postRouter)

server.listen(4000, () => {
    console.log('\n*** Running on port 4k ***\n')
})