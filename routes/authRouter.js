const express = require('express')

const AuthController = require('./../controllers/authController')

const router = express.Router()

router.route('/signup').post(AuthController.signUp)
router.route('/login').post(AuthController.logIn)

module.exports = router