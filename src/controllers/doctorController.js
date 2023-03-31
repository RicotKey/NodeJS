import doctorService from '../service/doctorService'
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctors = await doctorService.getTopDoctorSV(+limit);
        return res.status(200).json(doctors)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server... "
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctorSV();
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server... "
        })
    }
}

let postinfordoctor = async (req, res) => {
    try {
        let reponese = await doctorService.saveDetailDoctor(req.body);
        return res.status(200).json(reponese);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server... "
        })
    }
}
let getdetailDoctor = async (req, res) => {
    try {
        let reponese = await doctorService.getdetailDoctorSV(req.query.id);
        return res.status(200).json(reponese);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server... "
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(
            infor
        )
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server... "
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleByDate(req.query.doctorid, req.query.date)
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    postinfordoctor,
    getdetailDoctor,
    bulkCreateSchedule,
    getScheduleByDate
}