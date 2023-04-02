import nodemailer from 'nodemailer'
require('dotenv').config();


let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object 
    let info = await transporter.sendMail({
        from: '"DEADLINE NEVER DIE 👻" <nguyenbuihoangphuoc@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên DEADLINE NEVER DIE</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    
        <p>Nếu các thông tin trên là đúng, vui lòng click vào liên kế để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>
    
        <div> Xin chần thành cảm ơn.</div>
        <h3>DEADLINE NEVER DIE</h3>
        <h4>Luôn trong trạng thái dealine để chúng ta tràng đầy sức mạnh</h4>
        `
    }
    if (dataSend.language === 'en') {
        result = `<h3>Hello ${dataSend.patientName}!</h3>
        <p>You are receiving this email because you have made an online appointment for a medical examination on DEADLINE NEVER DIE</p>
        <p>Appointment information:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the appointment booking process.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>

        <div>Thank you very much.</div>
        <h3>DEADLINE NEVER DIE</h3>
        <h4>Always in a state of deadline to make us full of strength</h4>
`

    }

    return result;
}
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();





module.exports = {
    sendSimpleEmail
}
