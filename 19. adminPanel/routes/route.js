const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../middleware/multer");

route.get("/",ctl.login);
route.post("/login",ctl.loginData);
route.get("/logout",ctl.logout);
route.get("/dashboard",ctl.home);
route.get("/addAdmin",ctl.addAdmin);
route.post("/addRecord",multer,ctl.addRecord);
route.get("/viewAdmin",ctl.viewRecord);
route.get("/editRecord",ctl.editRecord);
route.post("/updateRecord",multer,ctl.updateRecord);
route.get("/deleteRecord",ctl.deleteRecord);

module.exports = route;