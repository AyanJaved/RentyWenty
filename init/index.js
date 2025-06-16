const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/RentyWenty";
main()
  .then(() => {
    console.log("Conneccted to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "684d32ec376177301ea2088c",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was Initialized");
};
initDB();
