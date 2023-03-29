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

module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    postinfordoctor
}