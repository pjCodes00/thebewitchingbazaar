const Cart= require('../models/Cart')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, NotFoundError}= require('../errors') 
const Product = require('../models/Product')

const createCartItem= async (req, res) => {
  //res.send('create a cart')
  
  const {amount, color, productId} = req.body

  let cartQuery= {
    product: productId, 
    color: color,
  }

  if(req.user.isGuest) {
    cartQuery.guest= req.user.userId
  } else{
    cartQuery.user= req.user.userId
  }
  
 
  let cartItem= await Cart.findOne({cartQuery})

   if(cartItem ) {
    const newAmount= cartItem.amount + amount

    if(newAmount > 5) {
      throw new BadRequestError('Amount cannot exceed 5')
    }

    cartItem.amount = newAmount
    await cartItem.save()
    return res.status(StatusCodes.OK).json({cartItem})

   } else {
    
    const createCartItem= {
      product: productId,
      amount: amount,
      color: color,
      ...(req.user.isGuest 
        ? {guest: req.user.userId}
        : {user: req.user.userId}
      ),
    }

    cartItem= await Cart.create(createCartItem)
    res.status(StatusCodes.OK).json({cartItem})  
   }

 
}
 
const getAllCartItems= async (req, res) => {
 // res.send('get all carts')
 const filter= req.user.isGuest 
        ? {guest: req.user.userId}
        : {user: req.user.userId}

 const cartItems= await Cart.find(filter).populate('product')
 res.status(StatusCodes.OK).json({cartItems, count: cartItems.length})
}

const updateCartItem= async (req,res) => {
  //res.send('update cart item amount')
  const{amount}= req.body

  const filter= req.user.isGuest 
        ? {guest: req.user.userId}
        : {user: req.user.userId}


  const cartItem= await Cart.findOneAndUpdate(
    {_id: req.params.id, ...filter},
    { amount: amount},
    { new: true, runValidators: true},
  )

  res.status(StatusCodes.OK).json({cartItem})
}

const deleteCartItem= async(req, res) => {
  //res.send('delete cart item')

  const filter= req.user.isGuest 
        ? {guest: req.user.userId}
        : {user: req.user.userId}


  const cartItem= await Cart.findOneAndDelete({
    _id: req.params.id,
     ...filter
  })
  res.status(StatusCodes.OK).json({cartItem})
}

module.exports= {createCartItem, getAllCartItems, updateCartItem, deleteCartItem}