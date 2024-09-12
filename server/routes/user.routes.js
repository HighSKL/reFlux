const Router = require("express")

const router = new Router()

const userController = require("../controller/UserController")

router.get("/user", ()=>{})
router.post("/user/authByEmail", userController.authByEmail)
router.get("/user/confirmEmail", userController.confirmEmailGuid)

module.exports = router