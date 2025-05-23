const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("../middleware/multer");
const passportSt = require("../middleware/passport_strategy");

route.get("/",ctl.login);
route.post("/login",passportSt.authenticate("local",{failureRedirect : "/"}),ctl.loginData);
route.get("/logout",ctl.logout);
route.get("/dashboard",passportSt.checkAuth,ctl.home);
route.get("/addAdmin",passportSt.checkAuth,ctl.addAdmin);
route.post("/addRecord",passportSt.checkAuth,multer.single("profile_photo"),ctl.addRecord);
route.get("/viewAdmin",passportSt.checkAuth,ctl.viewRecord);
route.get("/editRecord",passportSt.checkAuth,ctl.editRecord);
route.post("/updateRecord",passportSt.checkAuth,multer.single("profile_photo"),ctl.updateRecord);
route.get("/deleteRecord",passportSt.checkAuth,ctl.deleteRecord);
route.get("/profile",passportSt.checkAuth,ctl.profile);
route.get("/changePassword",passportSt.checkAuth,ctl.changePassword);
route.post("/changePassword",passportSt.checkAuth,ctl.changePasswordRecord);
route.post("/lostPassword",ctl.lostPassword);
route.post("/verifyPass",ctl.verifyPass);

module.exports = route;