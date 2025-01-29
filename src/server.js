const express = require('express')
require('dotenv').config()
require('./db/connect')
const v1Router = require("./routers/v1/v1.router")
const {RedirectURLController} = require("./controllers/url.controller")

const NODE_ENV = process.env.NODE_ENV

const PORT = process.env[`${NODE_ENV}_PORT`]


const server = express()

// It will parse the body of the request into JSON
server.use(express.json())

server.get("/:keyId", RedirectURLController)

server.use("/api/v1", v1Router)

server.listen(PORT, ()=>{
    console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`)
})