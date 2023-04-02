import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

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
    router.get('/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    //patient api
    router.post('/patient-book-appointment', patientController.postBookAppointment)
    router.post('/verify-book-appointment', patientController.postVerifyBookAppointment)
    //specialty api
    router.post('/create-new-specialty', specialtyController.createSpecialty)
    router.get('/get-specialty', specialtyController.getAllSpecialty);
    router.get('/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)
    //Clinnic api
    router.post('/create-new-clinic', clinicController.createClinic)

    return app.use('/api/v1', router)
}


export default initApiRoute;