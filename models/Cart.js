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
   
    
  },

  amount:{
    type: Number,
    required: true
  },

})

module.exports= mongoose.model('Cart', cartSchema)