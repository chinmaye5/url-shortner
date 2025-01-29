const express=require("express");
const authRouter = express.Router()
const {SigninController,SignupController}=require("./../../controllers/auth.controller")

authRouter.post("/signup",SignupController);
authRouter.post("/signin",SigninController);

module.exports=authRouter;