const mongoose = require("mongoose")

const URLSchema = new mongoose.Schema({
    "originalUrl" : {
        type : String,
        required : true
    },
    "keyId" : {
        type : String,
        required : true
    },
    "clickedCount" : {
        type : Number,
        default : 0
    },
    "createdAt" : {
        type : Number,
        default : new Date().getTime()
    }
})

const URLSModel = mongoose.model("urls", URLSchema)

module.exports = URLSModel