import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initApiRoute = (app) => {
   router.post('/login', userController.handleLogin)

    return app.use('/api/v1', router)
}


export default initApiRoute;