var nodemailer = require("nodemailer");
const OTP = require('../Model/Otp')


function generateOTP(length) {
    const charset = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        OTP += charset[randomIndex];
    }
    return OTP;
}

exports.Sendemail = async (user) => {

    const otp = generateOTP(6);

    await OTP.create({
        Otp: otp,
        Email: user
    })

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mr.jeelsardhara@gmail.com",
            pass: "pooqvgpnglvwkwnf",
        },
    });


    var mailOptions = {
        from: "mr.jeelsardhara@gmail.com",
        to: user,
        subject: "Send Mail From {JS}",
        text: `your otp is ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};