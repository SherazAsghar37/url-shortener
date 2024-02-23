const express = require("express");
const {
  handlerUrlShortener,
  handlerRedirect,
  handlerGetUrls,
  handlerAnalytics,
} = require("../controllers/url_controller");

const { restrictToApiUser } = require("../middlewares/auth");
const urlRouter = express.Router();
const redirect = express.Router();

urlRouter
  .route("/")
  .post(restrictToApiUser(["Normal", "Admin"]), handlerUrlShortener);
urlRouter.route("/getUrls").get(restrictToApiUser(["Admin"]), handlerGetUrls);
redirect.route("/:shortId").get(handlerRedirect);
urlRouter
  .route("/analytics/:shortId")
  .get(restrictToApiUser(["Normal", "Admin"]), handlerAnalytics);
module.exports = { urlRouter, redirect };
