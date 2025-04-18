const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../middleware/multer");

route.get("/",ctl.home);

route.get("/addPage",ctl.add);

route.post("/addMovie",multer,ctl.addRecord);

route.get("/editMovie",ctl.editRecord);

route.post("/updateMovie",multer,ctl.updateRecord);

route.get("/deleteMovie",ctl.deleteRecord);

module.exports = route;