import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

let router = express.Router();

let initApiRoute = (app) => {

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Authenticate user and generate access token
   *     description: Endpoint for user authentication
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user credentials
   *         description: User credentials to login
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *               description: User's email
   *             password:
   *               type: string
   *               description: User's password
   *     responses:
   *       200:
   *         description: Access token generated successfully
   *       401:
   *         description: Invalid email or password
   */
  router.post('/login', userController.handleLogin)
  /**
 * @swagger
 * /get-all-user:
 *   get:
 *     summary: Get all users
 *     description: Endpoint for getting all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all users
 */
  router.get('/get-all-user', userController.handleGetAllUser)

  /**
   * @swagger
   * /create-new-user:
   *   post:
   *     summary: Create a new user
   *     description: Endpoint for creating a new user
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user data
   *         description: User data for creating a new user
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: User's name
   *             email:
   *               type: string
   *               description: User's email
   *             password:
   *               type: string
   *               description: User's password
   *     responses:
   *       200:
   *         description: User created successfully
   *       400:
   *         description: Invalid user data
   */
  router.post('/create-new-user', userController.handleCreateNewUser)
  /**
 * @swagger
 * /edit-user:
 *   put:
 *     summary: Update an existing user by ID
 *     description: Use this route to update an existing user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The updated user object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *       - in: query
 *         name: id
 *         description: The ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated user object
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
  router.put('/edit-user', userController.handleEditUser)

  /**
   * @swagger
   * /delete-user:
   *   delete:
   *     summary: Delete a user by ID
   *     description: Use this route to delete a user by their ID.
   *     tags: [Users]
   *     parameters:
   *       - in: query
   *         name: id
   *         description: The ID of the user to delete
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */

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
  router.get('/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
  router.post('/send-remedy', doctorController.sendRemedy);
  //patient api
  router.post('/patient-book-appointment', patientController.postBookAppointment)
  router.post('/verify-book-appointment', patientController.postVerifyBookAppointment)
  //specialty api
  router.post('/create-new-specialty', specialtyController.createSpecialty)
  router.get('/get-specialty', specialtyController.getAllSpecialty);
  router.get('/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)
  //Clinnic api
  router.post('/create-new-clinic', clinicController.createClinic)
  router.get('/get-clinic', clinicController.getAllClinic);
  router.get('/get-detail-clinic-by-id', clinicController.getDetailClinicById)

  return app.use('/api/v1', router)
}


export default initApiRoute;