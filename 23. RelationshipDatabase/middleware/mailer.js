const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "yashbapodara22@gmail.com",
        pass : "pngdkwicvzsuqzwz"
    }
})

module.exports.sendOtp = (to,otp) => {
    let mailOptions = {
        to : to,
        from : "yashbapodara22@gmail.com",
        subject : "PASSWORD RESET OTP",
        text : `you password reset otp is ${otp}`
    }

    transport.sendMail(mailOptions, (err) => {
        err ? console.log(err) : console.log("Otp sended sucessfully");
      });
}