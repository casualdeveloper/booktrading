const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const setupPassport = require("./setuppassport");
const helmet = require("helmet");
const compression = require("compression");


const routes = require("./routes");

mongoose.connect("mongodb://localhost:27017/booktrading");

app.set("port", process.env.PORT || 8080);

app.use(compression());

app.use(express.static("public"));

app.use(helmet.xssFilter());
app.use(helmet.frameguard("sameorigin"));
app.use(helmet.noSniff());

app.disable("x-powered-by");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "THEMOSTSECRETRANDOMSTRING@#U(u98u98u2394u9sd8fu9su3294uq394u2938u",
    resave: true,
    saveUninitialized: true
}));

setupPassport();

app.use(routes);

app.listen(app.get("port"), err => {
    if(err){
        console.log(err);
        return;
    } 
    console.log(`Server started on port ${app.get("port")}`);
});