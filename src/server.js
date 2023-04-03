import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from './route/web';
import connectDB from './configs/connectDB'
import initApiRoute from './route/api'
import cors from 'cors'
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088;
// app.use(cors({origin: true}))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
//setup ViewEngine
configViewEngine(app);

//init WebRoute
initWebRoute(app);

//connectDB
connectDB();

//init API
initApiRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})