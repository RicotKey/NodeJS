import { reject } from "lodash";
import db from "../models/index";
require('dotenv').config();

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorid || !data.timeType || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        roleid: 'R3'
                    },
                });
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientid: user[0].id },
                        default: {
                            statusid: 'S1',
                            doctorid: data.doctorid,
                            patientid: user[0].id,
                            date: data.date,
                            timeType: data.timeType
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

module.exports = {
    postBookAppointment
}