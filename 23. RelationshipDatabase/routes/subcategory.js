const express = require("express")
const route = express.Router();
const ctl3 = require("../controller/ctl3")

route.get("/addSubCategory",ctl3.addSubCategory);
route.post("/addSubCategoryRecord",ctl3.addSubCategoryRecord);

route.get("/viewSubCategory",ctl3.viewSubCategory);

module.exports = route;