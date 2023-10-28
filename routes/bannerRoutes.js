const express = require("express");
const {
  getBanners,
  addBanner,
  deleteBanner,
  getCategories,
  getSubCategories,
} = require("../controllers/bannerController");

const eventRouter = express.Router();

eventRouter.get("/get-banners", getBanners);
eventRouter.post("/add-banner", addBanner);
eventRouter.delete("/delete-banner", deleteBanner);
eventRouter.get("/get-categories", getCategories);
eventRouter.get("/get-subcategories", getSubCategories);
module.exports = eventRouter;
