const express = require('express')
require('dotenv').config()
require('./db/connect')
const {v1Router} = require("./routers/v1/index")

const NODE_ENV = process.env.NODE_ENV

const PORT = process.env[`${NODE_ENV}_PORT`]

const server = express()

server.use("/api/v1", v1Router)

server.listen(PORT, ()=>{
    console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`)
})