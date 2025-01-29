// const httpStatus = require("http-status")
const { isUserPresentUsingEmailService } = require("../services/user.service");
const { CheckEmailDomainIsPersonalOrNotUtil } = require("../utils/auth.utils");


const SignupController = async (req, res)=>{
    try{

        const {fullName, email, password} = req.body
        if(!fullName){
            const err=new Error("Full name is required");
            err.status=400;
            throw err;
        }
        if(!password){
            const err=new Error("Password is required");
            err.status=400;
            throw err;
        }
        if(!email){
            const err=new Error("Email is required");
            err.status=400;
            throw err;
        }

        //if user already present
        const isUserPresentUsingEmailServiceResult=await isUserPresentUsingEmailService(emailDomain);

        if(isUserPresentUsingEmailServiceResult){
            throw new Error("User already present");
            err.statusCode=400;
            throw err
        }

        const emailDomain=email.split('@')[1]
        console.log(emailDomain);
        const CheckEmailDomainIsPersonalOrNotUtilResult=CheckEmailDomainIsPersonalOrNotUtil(emailDomain);

        if(CheckEmailDomainIsPersonalOrNotUtilResult.success){
            //if email is personal
        }else{
            //if email is not personal or business


            //TODO!: from email extract the organisation domain and anme

            //TODO2: check if organization is already created or not

            //TODO3: if organization is already created for the user, then use the existing organisation detail otherwise create new organisation
        }

        console.log("Full-name: ",fullName,"\nEmail: ",email,"\nPassword: ",password);
        res.status(201).json({
            success : true
        })

    }catch(err){
        console.log(`Error in SignupController with err : ${err}`)
        res.status(err.statusCode ? err.statusCode : 500).json({
            success : false
        })
        
    }
}

const SigninController = async (req, res)=>{

}

module.exports = {
    SignupController,
    SigninController
}
