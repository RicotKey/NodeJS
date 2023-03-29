import db from '../models/index'

let getTopDoctorSV = (limitimput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitimput,
                where: { roleid: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctorSV = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleid: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

let saveDetailDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorid || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Parameter missing'
                })
            } else {
                await db.Markdown.create(
                    {
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorid: inputData.doctorid

                    })

                resolve({
                    errCode: 0,
                    errMessage: 'Create infor doctor success'
                })
            }
        } catch (error) {
            reject(error)
        }

    })
}



module.exports = {
    getTopDoctorSV,
    getAllDoctorSV,
    saveDetailDoctor
}