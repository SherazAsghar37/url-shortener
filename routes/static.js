const express = require("express");
const { handlerRedirect } = require("../controllers/url_controller");
const { handlerUrlShortenerHTML } = require("../controllers/url_controller");
const staticRouter = express.Router();
// const staticShortnerRouter = express.Router();
const { restrictToWebUser } = require("../middlewares/auth");
staticRouter
  .route("/")
  .get((req, res) => {
    return res.render("home");
  })
  .post(restrictToWebUser(["Normal", "Admin"]), handlerUrlShortenerHTML);
// staticRouter.route("/:shortId").get(handlerRedirect);
staticRouter.route("/signup").get((req, res) => {
  return res.render("signup");
});
staticRouter.route("/login").get((req, res) => {
  return res.render("login");
});

// staticShortnerRouter.route("/");

module.exports = { staticRouter };
