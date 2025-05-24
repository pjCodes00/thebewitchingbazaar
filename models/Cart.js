const mongoose= require('mongoose')

const cartSchema= new mongoose.Schema({
  product:{
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true

  },

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

  color:{
    type: String,
   // default: [0]
    
  },

  amount:{
    type: Number,
    required: true
  },
/*
  name:{
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  price:{
    type: Number,
    required: true
  },

  shipping:{
    type: Boolean,
   // required: true
  }
   */
})

module.exports= mongoose.model('Cart', cartSchema)