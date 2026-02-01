const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
// signup form render
// request to signup form
router
  .route("/signup")
  .get(userController.renderSignUp)
  .post(wrapAsync(userController.signup));
// rendering login form
// request to Login form the actual work is done by passport
router.route("/login").get( wrapAsync(userController.renderLoginForm)).post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);
// logout
router.get("/logout", userController.logout);
// legal pages
router.get("/legal", (req, res) => {
  res.render("includes/legal.ejs");
});
module.exports = router;
