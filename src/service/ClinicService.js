const db = require("../models");

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.imageBase64 || !data.address || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {

        try {
            let data = await db.Clinic.findAll({
                order: [['createdAt', 'DESC']],
            });
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailClinicById = (inputid, location) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputid) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputid
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicid: inputid },
                        attributes: ['doctorid', 'provinceid'],
                    })
                    data.doctorClinic = doctorClinic
                } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById

}