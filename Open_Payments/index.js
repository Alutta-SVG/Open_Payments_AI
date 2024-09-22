import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import home from "./routes/home.js";
import shoes from "./routes/shoes.js";


//route instances
const home_route = home()
const shoes_route = shoes()

//expressJS instance
const app = express();

//middleware configuration
app.use(
    session({
        secret: "shoe catalogue api",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});


//screen routes
app.get('/', home_route.home_page);
app.get('/shoes', shoes_route.shoes_page)
app.get('/shoes/brand/:brandname', shoes_route.get_brand)
app.get('/shoes/brand/:size', shoes_route.get_size)
app.get('/shoes/brand/:brandname/size/:size', shoes_route.get_size_and_brand)
app.get('/shoes/filter', shoes_route.filterShoes);
 
// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});
