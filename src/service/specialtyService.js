import db from "../models/index";

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {

        try {
            let data = await db.Specialty.findAll({
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

let getDetailSpecialtyById = (inputid, location) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputid || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputid
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyid: inputid },
                            attributes: ['doctorid', 'provinceid']
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyid: inputid,
                                provinceid: location
                            },
                            attributes: ['doctorid', 'provinceid']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
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
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById

}