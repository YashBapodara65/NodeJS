const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const middleware = require("../middleware/multer");
const passportSt = require("../middleware/passport_strategy");

route.get("/",ctl.login);
route.post("/loginData",passportSt.authenticate("local",{failureRedirect: "/"}),ctl.loginData);
route.get("/logout",ctl.logout);
route.get("/dashboard",passportSt.checkAuth,ctl.dashboard);

route.get("/addAdmin",passportSt.checkAuth,ctl.addAdmin);
route.get("/viewAdmin",passportSt.checkAuth,ctl.viewAdmin);

route.get("/editRecord",passportSt.checkAuth,ctl.editAdmin);
route.get("/deleteRecord",passportSt.checkAuth,ctl.deleteRecord);
route.post("/addRecord",middleware.single("profile_photo"),ctl.addRecord);
route.post("/updateRecord",middleware.single("profile_photo"),ctl.updateRecord);

route.get("/changePassword",passportSt.checkAuth,ctl.changePassword);

route.post("/updatePassword",ctl.updatePassword);

route.get("/profile",passportSt.checkAuth,ctl.profile);

route.get("/forgotPassword",ctl.forgotPassword);

route.post("/forgotPasswordData",ctl.forgotPasswordData);

route.post("/verifyPassword",ctl.verifyPassword);

module.exports = route;