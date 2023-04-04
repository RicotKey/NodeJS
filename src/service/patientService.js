import { reject } from "lodash";
import db from "../models/index";
import emailService from "./emailService"
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()

let buildUrlEmail = (doctorid, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorid=${doctorid}`
    return result
}

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorid || !data.timeType || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorid, token)
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleid: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        firstName: data.fullName
                    },
                });


                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientid: user[0].id },
                        defaults: {
                            statusid: 'S1',
                            doctorid: data.doctorid,
                            patientid: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorid) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorid: data.doctorid,
                        token: data.token,
                        statusid: 'S1'
                    },
                    raw: false
                })


                if (appointment) {
                    appointment.statusid = 'S2'
                    await db.Schedule.destroy({
                        where: {
                            doctorid: appointment.doctorid,
                            timeType: appointment.timeType
                        }
                    })
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}