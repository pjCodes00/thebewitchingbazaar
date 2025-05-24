const mongoose= require('mongoose')

const guestSchema= new mongoose.Schema({
  name: {
    type: String,
    default: 'guest'
  }
}, {timeStamps: true})

module.exports= mongoose.model('Guest', guestSchema)