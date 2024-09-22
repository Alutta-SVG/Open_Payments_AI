import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import home from "./routes/home.js";



//route instances
const home_route = home()


//expressJS instance
const app = express();

//middleware configuration
app.use(
    session({
        secret: "Cash One",
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

 
// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});
