const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../middleware/multer");

route.get("/",ctl.firstPage);

route.post("/addRecord",multer,ctl.secondPage);

route.get("/deleteRecord",ctl.deletePage);

route.get("/editRecord",ctl.editPage);

route.post("/updateRecord",multer,ctl.updatePage);

module.exports = route;