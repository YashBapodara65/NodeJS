const express = require("express");
const route = express.Router();
const ctl = require("../controller/categoryCtl");
const passportSt = require("../middleware/passport_strategy");
const multer = require("../middleware/multer");

route.get("/addCategory",passportSt.checkAuth,ctl.addCategory);
route.post("/addCategoryRecord",multer.single("category_image"),ctl.addCategoryRecord);

route.get("/viewCategory",passportSt.checkAuth,ctl.viewCategory);

module.exports = route;