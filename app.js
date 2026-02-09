// we will not use this env file in production stage
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const dbUrl = process.env.ATLAS_DB_URL;
main()
  .then(() => {
    console.log("Connected to Database successfully");
  })
  .catch((err) => {
    console.error("Failed to Connect to Database", err);
    process.exit(1);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

//view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);
//middleware setup
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
const store = MongoStore.create({
  mongoUrl: dbUrl,
  // crypto: {
  //   secret: process.env.SECRET,
  // },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("Error in Mongo Session Store");
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 1000 * 60 * 60,
    maxAge: 7 * 24 * 1000 * 60 * 60,
    httpOnly: true, //cross scripting attack safety
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
  },
};
//searchBar
app.use((req, res, next) => {
  res.locals.search = req.query.search || "";
  next();
});
// session and authentication
app.use(session(sessionOptions));
app.use(flash()); //always use it before routes
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
//passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// global middleware for flash message and current user
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; //used in navbar for logged in info
  res.locals.search = req.query.search || "";
  res.locals.path = req.path;
  next();
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
// middleWare
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
// Error Handeling middleware
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  let { statusCode = 500, message = "Something went WRONG" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is listening At : 8080");
});
