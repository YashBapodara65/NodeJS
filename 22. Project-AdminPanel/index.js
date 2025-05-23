const express = require("express");
const port = 1008;
const db = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const connectFlash = require("connect-flash");
const flash = require("./middleware/flash");

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(cookieParser());

app.use(session({
    name : "sessionLocal", // session name
    secret : "rnw", // third party user can access session with secret key
    resave : true, // when you change route then again save session for 10 minutes
    saveUninitialized : false, // does not save before create a session
    cookie : {maxAge : 100 * 100 * 60} // for 10 minutes
}))

app.use(connectFlash());
app.use(flash.setFlash);

app.use(passport.initialize());
app.use(passport.session());

app.use("/",require("./routes/route"));
app.use("/category",require("./routes/category"));
app.use("/subcategory",require("./routes/subcat"));
app.use("/product",require("./routes/product"));

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Server started on port :- "+port);
})