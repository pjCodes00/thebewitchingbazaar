const mongoose= require('mongoose')

const orderSchema= new mongoose.Schema({
 /* cartItems:[{
    type: mongoose.Types.ObjectId,
    ref: 'Cart',
    required: true
  }],
*/

  items:[{
    product:{
      name: String,
      image: String,
      price: Number
    },

    amount: Number
    
  }],

  user:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    default: null
  },

  guest:{
    type: mongoose.Types.ObjectId,
    ref: 'Guest',
    default: null
  },



  name: {
    type: String,
    required: [true, 'Please provide name']
  },

  address: {
    type: String,
    required: [true, ' Please provide address']
  },

  orderTotal:{
    type: Number,
    required: true
  },

  orderDate:{
    type: Date,
    //default: Date.now,
    required: true
  },

  deliveryDate:{
    type: Date,
   /* default: function() {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },*/

    required: true
  },

  status:{
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Shipped', 'Ready for delivery/Pickup', 'Delivered', 'Cancelled']
  },

  countDownMsg:{
    type: String
  }


})

module.exports= mongoose.model('Order', orderSchema)