const db = require('../db')
const nodemailer = require('nodemailer')
const ErrorsCode = require('../Errors/ErrorsCode')
const uuidv4 = require('../functions')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserService{
    registration(){

    }

    async authByEmail(email, password){

        if(!process.env["EMAIL_SEND_USERNAME"])
            return ErrorsCode.badRequest();

        const confirmEmailGuid = uuidv4()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env["EMAIL_SEND_USERNAME"],
                pass: process.env["EMAIL_SEND_PASSWORD"],
            },
        });

        try {
            await transporter.sendMail({
                from: process.env["EMAIL_SEND_USERNAME"],
                to: email,
                subject: "Звершение регистрации",
                text: `Код подтверждения регистрации перейдите по ссылке: ${process.env.BASE_URL}/api/v1/user/confirmEmail?email=${email}&guid=${confirmEmailGuid}`
            })
        } catch (err) {
            if(err.responseCode === 535)
                return ErrorsCode.unexpectedError("Неверные авторизационные данные отправителя письма")
            else
                return ErrorsCode.unexpectedError()
        }

        const date = new Date();
        const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
        await db.query(`INSERT INTO temp_user(expiresin, email, password, auth_guid) values ('${year}-${month}-${day + 2}', '${email}', '${password}', '${confirmEmailGuid}')`)
    }

    async confirmEmail(email, guid) {

        const user = (await db.query(`SELECT * FROM temp_user WHERE email='${email}' AND auth_guid='${guid}'`)).rows[0]

        if(!user)
            return ErrorsCode.userNotFound()

        const dateExpired = new Date(user.expiresin).getTime() < new Date().getTime()

        if(dateExpired)
            return ErrorsCode.tokenExpired()

        const refreshToken = jwt.sign({email: user.email}, process.env.SECRET_TOKEN, {expiresIn: '10d'})

        await db.query(`INSERT INTO special_user_data(email, password, token) values ('${user.email}', '${user.password}', '${refreshToken}')`)
        await db.query(`DELETE FROM temp_user WHERE email='${email}'`)


        return {status: 200, message: "Пользователь успешно авторизован"}


        // if(user)
        //     db.query(``)
    }

    authorize(){

    }
}

module.exports=new UserService();