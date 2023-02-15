import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoute = (app) => {
    // router.get('/', homeController.getHomepage)
    // router.get('/detail/user/:id', homeController.getDetailpage)
    // router.post('/create-new-user', homeController.createNewUser)
    // router.post('/delete_user', homeController.deleteUser)
    // router.get('/edit_user/:id', homeController.editUser)
    // router.post('/update_user',homeController.updateUser)
    router.get('/', homeController.getHomPage);
    router.get('/', (req, res)=>{
        return res.send("Hello World")})

    return app.use('/', router)
}


export default initWebRoute;