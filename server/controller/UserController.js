const userService = require("../services/UserService");

class UserController{
    registration(req,res){
        userService.registration()
    }
}

module.exports = new UserController();