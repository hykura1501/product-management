const express = require("express")
const router = express.Router()
const controllers = require("../../controllers/client/user.controller")

const authMiddleware = require("../../middlewares/client/auth.middleware")

router.get('/register', controllers.register)
router.post('/register', controllers.registerPost)
router.get('/login', controllers.login)
router.post('/login', controllers.loginPost)
router.get('/logout', controllers.logout)
router.get('/password/forgot', controllers.forgotPassword)
router.post('/password/forgot', controllers.forgotPasswordPost)
router.get('/password/otp', controllers.otp)
router.post('/password/otp', controllers.otpPost)
router.get('/password/reset', controllers.reset)
router.post('/password/reset', controllers.resetPost)
router.get('/profile', authMiddleware.authRequire, controllers.profile)

module.exports = router