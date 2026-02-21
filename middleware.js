const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //save redirect url
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be Logged in");
    return res.redirect("/login");
  }
  next();
};
// this middleware is created beacause passport will remove all the info from req.session.redirectUrl but we need it so we will save it in local
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to Perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
// validating schema JOI
module.exports.validateListing = (req, res, next) => {
   // NORMALIZE CATEGORY FIRST
  if (req.body.listing?.category) {
    // single checkbox selected → string
    if (typeof req.body.listing.category === "string") {
      req.body.listing.category = [req.body.listing.category];
    }
  } else {
    // no category selected
    req.body.listing.category = [];
  }
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
// validating review
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to Perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
