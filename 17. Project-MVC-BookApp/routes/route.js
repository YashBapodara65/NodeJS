const express = require("express");
const ctl = require("../controller/ctl");
const route = express.Router();

route.get("/",ctl.readRecord);
route.get("/addBookNav",ctl.addForm);
route.post("/addBookData",ctl.addRecord);
route.get("/deleteBookData",ctl.deleteRecord);
route.get("/editBookData",ctl.editRecord);
route.post("/updateBookData",ctl.updateRecord);

module.exports = route;