const express = require("express")
const router = express.Router()
const controllers = require("../../controllers/client/users.controller")

const authMiddleware = require("../../middlewares/client/auth.middleware")

router.get('/list-users', controllers.listUsers)
router.get('/friends', controllers.friends)
router.get('/requests', controllers.requests)
router.get('/accepts', controllers.accepts)

module.exports = router