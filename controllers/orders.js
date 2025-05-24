const Order= require('../models/Order')
const Cart= require('../models/Cart')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, NotFoundError}= require('../errors')

const createOrder= async(req, res) => {
 
const {orderTotal, orderDate, deliveryDate, cartItemIds, name, address}= req.body



const filter= req.user.isGuest
     ? {guest: req.user.userId}
     : {user: req.user.userId}

const cartItems= await Cart.find(filter).populate('product')

if(!cartItems.length) {
  throw new BadRequestError('Cannot place order as cart is empty!')
}

const orderItems= cartItems.map((cartItem) => ({
  product:{
    id: cartItem.product._id,
    name: cartItem.product.name,
    image: cartItem.product.image,
    price: cartItem.product.price
  },

  amount: cartItem.amount
}))

const guestOrderInfo={
  orderTotal,
 orderDate,
 deliveryDate,
  name,
  address

}

const order= await Order.create({
  items: orderItems,
  ...filter,
  ...(req.user.isGuest 
    ? guestOrderInfo
    : { orderTotal,
      orderDate,
      deliveryDate,
      name,
      address}
    )
})

await Cart.deleteMany(filter)

  res.status(StatusCodes.OK).json({order})
}

const getAllOrders= async(req, res) => {
  
  
const filter= req.user.isGuest
? {guest: req.user.userId}
: {user: req.user.userId}

  const orders= await Order.find(filter)


  for (const order of orders) {
    const now= new Date()
    const msPerDay= 24 * 60 * 60 * 1000
    const orderDate= new Date(order.orderDate)
    const deliveryDate= new Date(order.deliveryDate)
    const daysAfterOrder= Math.floor((now - orderDate) / msPerDay)
    const daysAfterDelivery= now > deliveryDate

    if(order.status !== 'Cancelled') {
      if(daysAfterOrder >= 2 && daysAfterOrder < 5) {
        order.status = 'Approved'
      } else if (daysAfterOrder >= 5 && now < deliveryDate) {
        order.status = 'Shipped'
      } else if (now.toDateString() === deliveryDate.toDateString()) {
        order.status = 'Ready for delivery/pickup'
      } else if(daysAfterDelivery) {
        order.status = 'Delivered'
      } else {
        order.status = 'Pending'
      }

      await order.save()
    }

    let countDownMsg=''
    if(order.status !== 'Cancelled') {
    if(!daysAfterDelivery) {
      const daysLeft= Math.ceil((deliveryDate - now) / msPerDay)
      countDownMsg= ` - ${daysLeft} day(s) left until delivery`
    } else{
      const daysAgo= Math.floor((now - deliveryDate) / msPerDay)
      countDownMsg= ` - Delivered ${daysAgo} day(s) ago`
    }

   
  }else {
    countDownMsg= ''
  }

  order.countDownMsg= countDownMsg
  await order.save()

  }


  res.status(StatusCodes.OK).json({orders, count: orders.length})
}

const cancelSingleOrder= async(req, res) => {
const orderId= req.params.id
const order= await Order.findById({_id:orderId})
console.log('this is the order status:', order.status)

if(!order) {
  throw new NotFoundError('no order with this id')
}

const now= new Date()
const msPerDay= 24 * 60 * 60 * 1000
const orderDate= new Date(order.orderDate)
const deliveryDate= new Date(order.deliveryDate)
const daysAfterOrder= Math.floor((now - orderDate) / msPerDay)
const daysAfterDelivery= now > deliveryDate

if(order.status !== 'Cancelled') {
  if(daysAfterOrder >= 2 && daysAfterOrder < 5) {
    order.status = 'Approved'
  } else if (daysAfterOrder >= 5 && now < deliveryDate) {
    order.status = 'Shipped'
  } else if (now.toDateString() === deliveryDate.toDateString()) {
    order.status = 'Ready for delivery/pickup'
  } else if(daysAfterDelivery) {
    order.status = 'Delivered'
  } else {
    order.status = 'Pending'
  }

}

let countDownMsg=''
if(order.status !== 'Cancelled') {
if(!daysAfterDelivery) {
  const daysLeft= Math.ceil((deliveryDate - now) / msPerDay)
  countDownMsg= ` - ${daysLeft} day(s) left until delivery`
} else{
  const daysAgo= Math.floor((now - deliveryDate) / msPerDay)
  countDownMsg= ` - Delivered ${daysAgo} day(s) ago`
}

}else {
  countDownMsg= ''
}

order.countDownMsg= countDownMsg
await order.save()

if(order.status !== 'Pending' && order.status !== 'Approved') {
  console.log('this is the order status:', order.status)
  throw new BadRequestError('Cannot cancel this order as it has been shipped')
  
}

order.status= 'Cancelled'
await order.save()

res.status(StatusCodes.OK).json({order})

}

module.exports= {createOrder, getAllOrders, cancelSingleOrder}