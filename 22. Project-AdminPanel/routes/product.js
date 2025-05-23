const express = require("express");
const route = express.Router();
const ctl = require("../controller/productCtl");
const passportSt = require("../middleware/passport_strategy");
const multer = require("../middleware/multer");

route.get("/addProduct",passportSt.checkAuth,ctl.addProduct);
route.post("/addProductRecord",multer.single("product_image"),ctl.addProductRecord);

route.get("/viewProduct",passportSt.checkAuth,ctl.viewProduct);

module.exports = route;