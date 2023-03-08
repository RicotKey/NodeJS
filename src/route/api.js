import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initApiRoute = (app) => {
    router.post('/login', userController.handleLogin)
    router.get('/get-all-user', userController.handleGetAllUser)
    router.post('/create-new-user', userController.handleCreateNewUser)
    router.put('/edit-user', userController.handleEditUser)
    router.delete('/delete-user', userController.handleDeleteUser)
    
    return app.use('/api/v1', router)
}


export default initApiRoute;