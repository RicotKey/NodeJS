import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from './route/web';
import connectDB from './configs/connectDB'
require('dotenv').config();

const app = express();
const port = process.env.PORT ||  8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//setup ViewEngine
configViewEngine(app);

//init WebRoute
initWebRoute(app);

//connectDB
connectDB();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})