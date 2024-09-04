const Router = require("express")

const router = new Router()

const userController = require("../controller/UserController")

router.get("/user", ()=>{console.log('aaaa')})
router.post("/user/authByEmail/:email", userController.authByEmail)

module.exports = router