const express= require('express')
const router= express.Router()
const {registerUser, loginUser, guestLogin}= require('../controllers/auth')

/*router.route('/register').post(registerUser)
router.route('/login').post(loginUser)*/

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/guest', guestLogin)

module.exports= router    