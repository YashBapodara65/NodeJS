const express = require("express");
const route = express.Router();
const ctl4 = require("../controller/ctl4");
const multer = require("../middleware/multer");
const passportSt = require("../middleware/passport_strategy")

route.get("/addProduct",passportSt.checkAuth,ctl4.addProduct);
route.post("/addProductRecord",multer.single("product_image"),ctl4.addProductRecord);
route.get("/viewProduct",passportSt.checkAuth,ctl4.viewProductRecord);

module.exports = route;