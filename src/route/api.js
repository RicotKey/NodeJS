import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"
let router = express.Router();

let initApiRoute = (app) => {
    //user api
    router.post('/login', userController.handleLogin)
    router.get('/get-all-user', userController.handleGetAllUser)
    router.post('/create-new-user', userController.handleCreateNewUser)
    router.put('/edit-user', userController.handleEditUser)
    router.delete('/delete-user', userController.handleDeleteUser)

    //allcode api
    router.get('/allcodes', userController.handleGetAllCodes)
    //doctor api
    router.get('/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/get-all-doctor', doctorController.getAllDoctor)
    router.post('/post-infor-doctor', doctorController.postinfordoctor)
    router.get('/getdetailDoctor', doctorController.getdetailDoctor)
    router.post('/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)


    return app.use('/api/v1', router)
}


export default initApiRoute;