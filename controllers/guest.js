const Guest= require('../models/Guest')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, UnauthenticatedError}= require('../errors')

const guestLogin= async(req, res) => {
 // res.send('login as guest')

 const guestName= `guest_${Date.now()}`

 const guestUser= await Guest.create({name: guestName})

 const token= jwt.sign(
  {
    userId: guestUser._id, 
    name: guestUser.name,
    isGuest: true
  }, 
  process.env.JWT_SECRET, 
  {expiresIn: process.env.JWT_LIFETIME}
)

 res.status(StatusCodes.OK).json({user: {name: guestUser.name}, token})



}

//module.exports= guestLogin