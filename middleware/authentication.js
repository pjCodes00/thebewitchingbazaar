const jwt= require('jsonwebtoken')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, UnauthenticatedError}= require('../errors')

const auth= (req, res, next) => {
  const authHeader= req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
     throw new UnauthenticatedError('Authentication invalid here')
  }

  const token= authHeader.split(' ')[1]
try{
  const decoded= jwt.verify(token, process.env.JWT_SECRET)
  req.user= {
    userId:decoded.userId, 
    name:decoded.name,
    isGuest: decoded.isGuest
  }
  next()
}catch(error) {
  throw new UnauthenticatedError('Authentication invalid heree')
}

}

module.exports=auth