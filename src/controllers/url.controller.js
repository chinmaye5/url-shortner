const {CreateNewURLService, GetURLDetailsUsingItsKeyIdService, UpdateTheURLUsingMongoIdService} = require("./../services/url.service")
const {GenerateUniqueIdForTheURLUtil} = require("./../utils/url.utils")
require("dotenv").config()

const jwt = require("jsonwebtoken")

const geoip = require('geoip-lite')

const NODE_ENV = process.env.NODE_ENV

const JWT_SECRET_KEY = process.env[`${NODE_ENV}_JWT_SECRET_KEY`]

const PORT = process.env[`${NODE_ENV}_PORT`]

const CreateNewURLController = async (req, res)=>{
    try{

        // extract the token from the req and verify the token : Authentication
        const token = req.headers.authorization.split(" ")[1]

        const tokenVerifyResult = await jwt.verify(token, JWT_SECRET_KEY)

        const {userId} = tokenVerifyResult

        const {originalURL} = req.body

        if(!originalURL){
            const err = new Error("originalURL is missing inside the body")
            err.statusCode = 400
            throw err
        }

        const keyId = GenerateUniqueIdForTheURLUtil(6)

        const CreateNewURLServiceResult = await CreateNewURLService(originalURL, keyId, userId)

        if(!CreateNewURLServiceResult.success){
            const err = new Error("Unable to create new URL")
            err.statusCode = 500
            throw err
        }

        const {data : {keyId : keyIdFromDB}} = CreateNewURLServiceResult

        const baseURL = NODE_ENV==="DEV" ? "localhost:" + PORT : req.host

        res.status(201).json({
            success : true,
            message : "New URL is created",
            redirectURL : `http://${baseURL}/${keyIdFromDB}`
        })

    }catch(err){

        console.log(`Error in CreateNewURLController with err : ${err}`)

        res.status(err.statusCode ? err.statusCode : 500).json({
            success : false,
            message : err.message
        })

    }
}

const RedirectURLController = async (req, res) => {
    try {
        const ip = req.ip;
        const geography = geoip.lookup(ip);

        console.log("IP Address:", ip);
        console.log("Geography Info:", geography);

        const { keyId } = req.params;
        if (!keyId) {
            throw new Error("keyId is required");
        }

        const GetURLDetailsUsingItsKeyIdServiceResult = await GetURLDetailsUsingItsKeyIdService(keyId);
        if (!GetURLDetailsUsingItsKeyIdServiceResult.success) {
            throw new Error("Unable to fetch data from GetURLDetailsUsingItsKeyIdService");
        }

        const { data: { _id: mongoId, originalUrl, clickedCount, createdAt } } = GetURLDetailsUsingItsKeyIdServiceResult;

        console.log("Fetched URL Details:", { originalUrl, clickedCount, createdAt });

        if (clickedCount > 10) {
            throw new Error("You have reached the max limit of 10 requests. Please upgrade for more limits");
        }

        if ((new Date().getTime() - createdAt) > 7 * 24 * 60 * 60 * 1000) {
            throw new Error("Your redirect URL is expired. Please upgrade for more expiry limits");
        }

        const UpdateTheURLUsingMongoIdServiceResult = await UpdateTheURLUsingMongoIdService(mongoId, geography?.region, geography?.country);
        if (!UpdateTheURLUsingMongoIdServiceResult.success) {
            throw new Error("Error while updating the URL in DB");
        }

        console.log("Redirecting to:", originalUrl);
        res.redirect(originalUrl);

    } catch (err) {
        console.error(`Error in RedirectURLController:`, err);
        res.status(400).json({ success: false, message: err.message });
    }
};


module.exports = {
    CreateNewURLController,
    RedirectURLController
}