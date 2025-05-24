const Order= require('../models/Order')
const Cart= require('../models/Cart')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, NotFoundError}= require('../errors')

const createOrder= async(req, res) => {
  /*
  const {orderTotal, orderDate, deliveryDate, cartItemIds, name, address}= req.body
  const order= await Order.create([{
    cartItems: cartItemIds,
    orderTotal,
    orderDate,
    deliveryDate,
    name,
    address

  }])
*/
const {orderTotal, orderDate, deliveryDate, cartItemIds, name, address}= req.body

const cartItems= await Cart.find({user: req.user.userId}).populate('product')

if(!cartItems.length) {
  throw new BadRequestError('cart is empty')
}

const orderItems= cartItems.map((cartItem) => ({
  product:{
    name: cartItem.product.name,
    image: cartItem.product.image,
    price: cartItem.product.price
  },

  amount: cartItem.amount
}))

const order= await Order.create({
  items: orderItems,
  user: req.user.userId,
  orderTotal,
  orderDate,
  deliveryDate,
  name,
  address

})

await Cart.deleteMany({user: req.user.userId})

  res.status(StatusCodes.OK).json({order})
}

const getAllOrders= async(req, res) => {
  /*
  const orders= await Order.find({}).populate({
    path: 'cartItems',
    populate:{
      path: 'product',
      select: 'name image'
    }
    
  })
    */
  const orders= await Order.find({user: req.user.userId})


  res.status(StatusCodes.OK).json({orders, count: orders.length})
}

module.exports= {createOrder, getAllOrders}