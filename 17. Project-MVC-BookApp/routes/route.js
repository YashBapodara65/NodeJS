const express = require("express");
const ctl = require("../controller/ctl");
const route = express.Router();
const middleware = require("../middleware/multer");

route.get("/",ctl.readRecord);
route.get("/addBookNav",ctl.addForm);
route.post("/addBookData",middleware,ctl.addRecord);
route.get("/deleteBookData",ctl.deleteRecord);
route.get("/editBookData",ctl.editRecord);
route.post("/updateBookData",middleware,ctl.updateRecord);

module.exports = route;