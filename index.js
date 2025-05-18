import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

//server settings
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
    console.log("server ready on port " + port);
    await dbConnect(process.env.LINK_DB)
}
server.listen(port, ready)

//engine settings (motor de plantillas)
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares settings
server.use(cookieParser(process.env.SECRET))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//sessions settings
server.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,// esto permite una vez iniciada la session que se mantenga abierta
    cookie: { maxAge: 60 * 1000 }, //7 * 24 * 60 * 60 * 1000 
    store: new MongoStore({
        mongoUrl: process.env.LINK_DB,
        //collectionName: "sessions"
    })
}));

//router settings
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);