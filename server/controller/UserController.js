const userService = require("../services/UserService");
const path = require("path");

class UserController{
    registration(req,res){
        userService.registration()
    }

    async authByEmail(req, res) {

        const { email, password } = req.body

        const emailSentStatus = await userService.authByEmail(email, password)

        if(emailSentStatus instanceof Error)
            return res.status(emailSentStatus.status).json(emailSentStatus)

        return res.status(200).json({succfess:true})
    }

    async confirmEmailGuid(req, res) {

        const { email, guid } = req.query
        res.set('Content-Type', 'text/html');

        const response = await userService.confirmEmail( email, guid )

        if(response instanceof Error)
            return res.sendFile(path.join(__dirname, '../pages/errorAuth/index.html'));

        return res.sendFile(path.join(__dirname, '../pages/successAuth/index.html'));
    }
}

module.exports = new UserController();