const express = require("express");
const {
  handlerUserSignup,
  handlerUserLogin,
  handlerUserSignupApi,
  handlerUserLoginApi,
} = require("../controllers/user");
const userRouter = express.Router();

userRouter.route("/").post(handlerUserSignup);
userRouter.route("/login").post(handlerUserLogin);
userRouter.route("/api/").post(handlerUserSignupApi);
userRouter.route("/api/login").post(handlerUserLoginApi);
module.exports = { userRouter };
