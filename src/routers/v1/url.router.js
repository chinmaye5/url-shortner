const express = require('express')

const URLRouter = express.Router()

const {CreateNewURLController} = require("./../../controllers/url.controller")

URLRouter.post("/new",CreateNewURLController)

// URLRouter.get("/all",(req, res)=>{
//     console.log(req.url)
//     res.send("ok")
// })

module.exports = URLRouter