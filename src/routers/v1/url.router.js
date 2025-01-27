const express = require('express')

const URLRouter = express.Router()

URLRouter.post("/new",(req, res)=>{
    console.log("get request at:",req.url)
    res.send("ok")
})

URLRouter.get("/all",(req, res)=>{
    console.log("get request at:",req.url)
    res.send("all")
})

URLRouter.get("/test",(req, res)=>{
    console.log("get test request at:",req.url)
    res.send("test")
})

module.exports = {
    URLRouter
}