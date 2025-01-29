const USERSModel = require("../models/users.model")

const isUserPresentUsingEmailService=async(email)=>{
    try{
        USERSModel.findOne({"email":email}).exec();

        if(user){
            return{
                success:true,
                data:user
            }
        }else{
            throw new Error("Unable to get user details")
        }

    }catch(err){
        console.log(`Error in isUserPresentUsingEmailService with err: ${err}`);
    }
}

module.exports={
    isUserPresentUsingEmailService
}