const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const middleware = require("../middleware/multer");

route.get("/",ctl.login);
route.post("/loginData",middleware,ctl.loginData);
route.get("/logout",ctl.logout);
route.get("/dashboard",ctl.dashboard);

route.get("/addAdmin",ctl.addAdmin);
route.get("/viewAdmin",ctl.viewAdmin);

route.get("/editRecord",ctl.editAdmin);
route.get("/deleteRecord",ctl.deleteRecord);
route.post("/addRecord",middleware,ctl.addRecord);
route.post("/updateRecord",middleware,ctl.updateRecord);

module.exports = route;