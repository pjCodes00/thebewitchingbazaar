const User= require('../models/User')
const Guest= require('../models/Guest')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, UnauthenticatedError}= require('../errors')

const registerUser= async(req, res) => {

 const {name, email, password}= req.body
 if(!name || !email || !password){
  throw new BadRequestError('Please provide name, email, password')
 }

 if(name.length < 3) {
  throw new BadRequestError('Name should be atleast 3 characters')
 }

 if(password.length < 6) {
  throw new BadRequestError('Password should be atleast 6 characters')
 }

 const salt= await bcrypt.genSalt(10)
 const hashedPassword= await bcrypt.hash(password, salt)
 const tempUser= {name, email, password: hashedPassword}

 const user= await User.create({...tempUser})

 const token= jwt.sign(
  {
    userId: user._id,
     name: user.name,
     isGuest: false
    },
   process.env.JWT_SECRET, 
   {expiresIn: process.env.JWT_LIFETIME}
  )

 res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}

const loginUser= async(req, res) => {
 
 const {email, password}= req.body
 if(!email || !password){
  throw new BadRequestError('Please provide email and password')
 }

 const user= await User.findOne({email})
 if(!user){
  throw new UnauthenticatedError('Invalid credentials')
 }

 const isPasswordCorrect= await bcrypt.compare(password, user.password)
 if(!isPasswordCorrect){
  throw new UnauthenticatedError('Invalid credentials')
 }

 const token= jwt.sign(
  {
    userId: user._id, 
    name: user.name,
    isGuest: false
  }, 
  process.env.JWT_SECRET,
   {expiresIn: process.env.JWT_LIFETIME})

 res.status(StatusCodes.OK).json({user: {name: user.name}, token})

}


const guestLogin= async(req, res) => {

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



module.exports= {registerUser, loginUser, guestLogin}