const express= require('express')
const router= express.Router()
const {registerUser, loginUser, guestLogin}= require('../controllers/auth')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/guest', guestLogin)

module.exports= router    