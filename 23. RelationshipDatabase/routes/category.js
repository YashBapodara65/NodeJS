const express = require("express")
const route = express.Router();
const ctl2 = require("../controller/ctl2")
const passportSt = require("../middleware/passport_strategy");
const multer = require("../middleware/multer");

route.get("/addCategory",ctl2.addCategory);
route.post("/addCategoryRecord",multer.single("category_image"),ctl2.addCategoryRecord);

route.get("/viewCategory",ctl2.viewCategory);

module.exports = route;