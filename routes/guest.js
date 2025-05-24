const express= require('express')
const router= express.Router()
const guestLogin= require('../controllers/guest')

router.post('/', guestLogin)

//module.exports= router
