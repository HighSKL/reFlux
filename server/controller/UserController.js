const userService = require("../services/UserService");

class UserController{
    registration(req,res){
        userService.registration()
    }

    async authByEmail(req, res) {
        const email = req.params.email;

        const emailSentStatus = await userService.authByEmail(email)

        if(emailSentStatus instanceof Error)
            return res.status(400).json(emailSentStatus)

        return res.status(200).json({success:true})
    }
}

module.exports = new UserController();