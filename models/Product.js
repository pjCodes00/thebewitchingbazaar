const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
  name:{
    type: String,
    required: true
  },

  price:{
    type: Number,
    required: true
  },

  category:{
    type: String,
    enum:{
      values:['Wealth', 'Love', 'Power', 'Shadow & hex', 'Beauty', 'Protection'],
      message: '{VALUE} is not supported'
    }
  },

  company:{
    type: String,
    enum:{
      values:['The Witch&#39;s Grimoire', 'Spellbound Treasures', 'Lunar Alchemy', 'The Enchanted Cauldron', 'Hex & Harmony'],
      message: '{VALUE} is not supported'
    }
  },

  shipping:{
    type: Boolean,
   
  },

  featured:{
    type: Boolean,
   
  },

  description:{
    type: String,
    required: true
  },

  rating: {
    type: Number,
    
  },

  image: {
    type: String,
    required: true

  },

   colors:{
    type: [String],
  

   },

   createdAt:{
    type: Date,
    default: Date.now()
   },

  
 
  }) 

module.exports= mongoose.model('Product', productSchema) 