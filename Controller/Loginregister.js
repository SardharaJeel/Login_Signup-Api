try {
    const Model = require('../Model/Loginregister');
    const { RegisterSend, LoginSend } = require('../Middleware/LoginRegisterMailer');
    const bcrypt = require('bcrypt');
    const numRate = 10;
    const { Sendemail } = require("../Middleware/ForgotOtp");
    const OTP = require('../Model/Otp')

    exports.Register = async (req, res) => {
        try {
            if (req.body.Password) req.body.Password = await bcrypt.hash(req.body.Password, numRate);

            const { Name, Email, Password } = req.body;

            if (!Name) throw new Error("Please Enter A Name Carefully...");
            if (!Email) throw new Error("Please Enter A Email Carefully...");
            if (!Password) throw new Error("Please Enter A Password Carefully...");

            const emailChecker = await Model.findOne({ Email });
            if (emailChecker) throw new Error("This Email Is Already Registered...");

            const Data = await Model.create({
                Name,
                Email,
                Password
            });

            await RegisterSend(Data.Email);

            res.status(200).json({
                status: "Data Is Added As Successfully...",
                Data
            });
        } catch (error) {
            res.status(400).json({
                status: "Data Is Not Added...",
                message: error.message
            });
        }
    };

    exports.Login = async (req, res) => {
        try {
            const { Email, Password } = req.body;

            if (!Email) throw new Error("Please Enter A Email Carefully...");
            if (!Password) throw new Error("Please Enter A Password Carefully...");

            const emailChecker = await Model.findOne({ Email });
            if (!emailChecker) throw new Error("This Email Is Not Registered...");

            const PassChecker = await bcrypt.compare(Password, emailChecker.Password);
            if (!PassChecker) throw new Error("This Password Is Wrong...");

            await LoginSend(emailChecker.Email);

            res.status(200).json({
                status: "Your Login As Successfully..."
            });
        } catch (error) {
            res.status(400).json({
                status: "You Are Not Valid To Login...",
                message: error.message
            });
        }
    };

    exports.OtpSent = async (req, res) => {
        try {
            const { Email } = req.body;

            if (!Email) throw new Error("Please Enter A Email Carefully...");
            const user = await Model.findOne({ Email });

            if (!user) throw new Error("This Email Is Not Registered Please Enter Carefully...");

            await Sendemail(Email);

            res.status(200).json({
                status: "Otp Is Successfully Sended..."
            });
        } catch (error) {
            res.status(400).json({
                status: "Otp Is Not Sended...",
                message: error.message
            });
        }
    };

    exports.OtpVerify = async (req, res) => {
        try {
            const { Otp, Email } = req.body;
            if (!Otp) throw new Error("Please Enter A Otp Carefully...");
            if (!Email) throw new Error("Please Enter A Email Carefully...");

            let validOtp = await OTP.findOne({
                Otp,
                Email
            });

            if (!validOtp) throw new Error("Otp Data Is Not Found...");

            res.status(200).json({
                status: "Otp Is Successfully Verify..."
            });
        } catch (error) {
            res.status(400).json({
                status: "Otp Is Not Verify...",
                message: error.message
            });
        }
    };

    exports.PassForgot = async (req, res) => {
        try {
            let { Email, Password, confirmPassword } = req.body;

            if (!Email) throw new Error("Please Enter A Email Carefully...");

            if (!Password) throw new Error("Please Enter A Password Carefully...");
            if (!confirmPassword) throw new Error("Please Enter A Confirm Password Carefully...");

            const emailChecker = await Model.findOne({ Email });
            if (!emailChecker) throw new Error("This Email Is Not Registered Please Enter Carefully...");

            if (Password !== confirmPassword) throw new Error("Password And Confirm Password Is Not Same...");

            Password = await bcrypt.hash(Password, 9);

            emailChecker.Password = Password;
            await emailChecker.save();

            res.status(200).json({
                status: "Password Is Forgot As Successfully...",
            });
        } catch (error) {
            res.status(400).json({
                status: "Password Is Not Forgot...",
                message: error.message,
            });
        }
    };

    console.log("Controller Is Nice Working...");
} catch (error) {
    console.log("Controller Is Not Working", error.message, "...");
}