const express = require("express");
const route = express.Router();
const ctl = require("../controller/subCatCtl");
const passportSt = require("../middleware/passport_strategy");

route.get("/addSubCategory",passportSt.checkAuth,ctl.addSubCategory);
route.post("/addSubCategoryRecord",ctl.addSubCategoryRecord);

route.get("/viewSubCategory",passportSt.checkAuth,ctl.viewSubCategory);

module.exports = route;