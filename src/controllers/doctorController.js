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
            message: "Error from server... "
        })
    }
}

module.exports = {
    getTopDoctorHome
}