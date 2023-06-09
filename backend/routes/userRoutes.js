const express = require("express")

const authController = require("../controllers/authController")

const router = express.Router()

//localhost:3000
router.route("/signup")
.post(authController.signUp)
.post(authController.login)
module.exports = router;