const Cart= require('../models/Cart')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, NotFoundError}= require('../errors') 
const Product = require('../models/Product')

const createCartItem= async (req, res) => {
  //res.send('create a cart')
  
  const {amount, color, productId} = req.body
  
 
  let cartItem= await Cart.findOne({
    product: productId, 
    color: color,
    user: req.user.userId
  })

   if(cartItem ) {
    const newAmount= cartItem.amount + amount

    if(newAmount > 5) {
      throw new BadRequestError('Amount cannot exceed 5')
    }

    cartItem.amount = newAmount
    await cartItem.save()
    return res.status(StatusCodes.OK).json({cartItem})

   } else {
    
    cartItem= await Cart.create({
      product: productId,
      amount: amount,
      color: color,
      user: req.user.userId
    })
      
   }
  res.status(StatusCodes.OK).json({cartItem})
}
 
const getAllCartItems= async (req, res) => {
 // res.send('get all carts')

 const cartItems= await Cart.find({user:req.user.userId}).populate('product')
 res.status(StatusCodes.OK).json({cartItems, count: cartItems.length})
}

const updateCartItem= async (req,res) => {
  //res.send('update cart item amount')
  const{amount}= req.body


  const cartItem= await Cart.findOneAndUpdate(
    {_id: req.params.id, user: req.user.userId},
    { amount: amount},
    { new: true, runValidators: true},
  )

  res.status(StatusCodes.OK).json({cartItem})
}

const deleteCartItem= async(req, res) => {
  //res.send('delete cart item')

  const cartItem= await Cart.findOneAndDelete({
    _id: req.params.id,
     user: req.user.userId
  })
  res.status(StatusCodes.OK).json({cartItem})
}

module.exports= {createCartItem, getAllCartItems, updateCartItem, deleteCartItem}