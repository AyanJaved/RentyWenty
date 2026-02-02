const Listing = require("../models/listing.js");
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner"); // using nested populate
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};
module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
if (
    req.body.listing.category &&
    typeof req.body.listing.category === "string"
  ) {
    req.body.listing.category = [req.body.listing.category];
  }
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  if (
    req.body.listing.category &&
    typeof req.body.listing.category === "string"
  ) {
    req.body.listing.category = [req.body.listing.category];
  }
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true, runValidators: true });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
// search 
function escapeRegex(text) {
  // Escape regex to prevent special character issues
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports.index = async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  /* APPLY CATEGORY ONLY IF PROVIDED */
  if (typeof category === "string" && category.trim().length > 0) {
    query.category = { $in: [category.trim()] };
  }

  /* APPLY SEARCH ONLY IF PROVIDED */
  if (typeof search === "string" && search.trim().length > 0) {
    const safeSearch = escapeRegex(search.trim());
    const regex = new RegExp(safeSearch, "i");

    query.$or = [
      { title: regex },
      { location: regex },
      { country: regex }
    ];
  }

  /* IF NO FILTERS → query = {} → returns all listings */
  const listings = await Listing.find(query).populate("owner");

  res.render("listings/index", {
    listings,
    search: search || "",
    category: category || ""
  });
};



