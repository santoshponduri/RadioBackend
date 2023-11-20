const express = require("express");
const {
  getBanners,
  addBanner,
  deleteBanner,
  getCategories,
  getSubCategories,
  getBannersByCategory,
} = require("../controllers/bannerController");

const eventRouter = express.Router();

eventRouter.get("/get-banners", getBanners);
eventRouter.post("/add-banner", addBanner);
eventRouter.delete("/delete-banner", deleteBanner);
eventRouter.get("/get-categories", getCategories);
eventRouter.get("/get-subcategories", getSubCategories);
eventRouter.post("/get-banner-by-category", getBannersByCategory);
module.exports = eventRouter;
