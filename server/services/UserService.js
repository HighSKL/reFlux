const db = require('../db')
const nodemailer = require('nodemailer')
const ErrorsCode = require('../Errors/ErrorsCode')

class UserService{
    registration(){

    }

    async authByEmail(email){

        if(!process.env["EMAIL_SEND_USERNAME"])
            return ErrorsCode.badRequest();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env["EMAIL_SEND_USERNAME"],
                pass: process.env["EMAIL_SEND_PASSWORD"],
            },
        });

        const result = await transporter.sendMail({
            from: process.env["EMAIL_SEND_USERNAME"],
            to: email,
            text: "Спасибо за регистрацию!"
        })
    }

    authorize(){

    }
}

module.exports=new UserService();