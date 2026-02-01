const Joi = require("joi");
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required().max(3500),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().allow("", null),
    category: Joi.array()
  .items(
    Joi.string().valid(
      "Trending",
      "Budget Stays",
      "Luxury",
      "Rooms",
      "Apartments",
      "Family",
      "Pet Friendly",
      "Tourist Spots",
      "Monthly Stays"
    )
  )
  .default([]),

    price: Joi.number().required().positive(),
  }).required(),
});
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required().max(500),
  }).required(),
});
