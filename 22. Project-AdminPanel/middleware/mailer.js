const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "bapodarayash65@gmail.com",
        pass : "kasuamnbwytluskk"
    }
})

module.exports.sendOtp = (to,otp) => {
    let mailOptions = {
        to : to,
        from : "bapodarayash65@gmail.com",
        subject : "PASSWORD RESET OTP",
        text : `you password reset otp is ${otp}`
    }

    transport.sendMail(mailOptions, (err) => {
        err ? console.log(err) : console.log("Otp sended sucessfully");
      });
}