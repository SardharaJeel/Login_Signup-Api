var nodemailer = require("nodemailer");
const Url = "jeelsardhara.onrender.com";

exports.RegisterSend = async (user) => {

    console.log(user)

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
        subject: "Sending Mail From { JS }",
        text: `Thank You For Successfully Register In :- ${Url} 🗿`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

exports.LoginSend = async (user) => {

    console.log(user)

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
        subject: "Sending Mail From { JS }",
        text: `Thank You For Successfully Login In :- ${Url} 🗿`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};