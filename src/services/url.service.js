const URLSModel = require("./../models/urls.model")

async function CreateNewURLService(originalUrl, keyId){
    try{

        const result = await URLSModel.create({"originalUrl" : originalUrl, "keyId" : keyId})

        if(!result){
            throw new Error("unable to call URLSModel.create()")
        }

        return {
            success : true,
            data : result
        }

    }catch(err){

        console.log(`Error in CreateNewURLService for originalUrl : ${originalUrl} & keyId : ${keyId} `)

        return {
            success : false
        }

    }
}

async function GetURLDetailsUsingItsKeyIdService(keyId){
    try{

        const URLDetail = await URLSModel.findOne({"keyId":keyId}).exec()

        if(!URLDetail){
            throw new Error(`Unable to fetch detail for URL with keyId : ${keyId} `)
        }

        return {
            success : true,
            data : URLDetail
        }

    }catch(err){
        console.log(`Error in GetURLDetailsUsingItsKeyIdService with err : ${err}`)
        return {
            success : false
        }
    }
}

async function UpdateTheClickedCountOfURLByOneUsingMongoIdService(mongoId) {
    try{

        const URL = await URLSModel.findOne({_id:mongoId}).exec()

        URL.clickedCount = URL.clickedCount + 1

        await URL.save()

        return {
            success : true
        }

    }catch(err){
        console.log(`Error in UpdateTheClickedCountOfURLByOneUsingKeyIdService with err : ${err}`)
        return {
            success : false
        }
    } 
}

module.exports = {
    CreateNewURLService,
    GetURLDetailsUsingItsKeyIdService,
    UpdateTheClickedCountOfURLByOneUsingMongoIdService
}