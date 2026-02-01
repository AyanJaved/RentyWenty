const User = require("../models/user.js")
module.exports.renderSignUp = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.signup = async (req, res,next) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/signup");
    }
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", `Welcome to RentyWenty ${username}`);
      res.redirect("/listings");
    });
  } catch (e) {
     let errorMsg = e.message;
  if (e.name === 'UserExistsError') {
    errorMsg = 'A user with this username already exists';
  }
  req.flash("error", errorMsg);
  res.redirect("/signup");
  }
};
module.exports.renderLoginForm = async (req, res) => {
  res.render("users/login.ejs");
};
module.exports.login = async (req, res) => {
  req.flash("success", `Welcome back, ${req.user.username}!`);
  // added this condition because if we login from nav bar it will not find anything in res.locals.redirectUrl hence throws an error so we will check and render it
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged out successfully!");
    res.redirect("/listings");
  });
};