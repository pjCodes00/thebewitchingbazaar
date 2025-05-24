require('dotenv').config()
require('express-async-errors')
const express= require('express')
const app= express()
const connectDB= require('./db/connect')
const authRouter= require('./routes/auth')
const productRouter= require('./routes/products')
const cartRouter= require('./routes/carts')
const orderRouter= require('./routes/orders')
const authenticateUser= require('./middleware/authentication')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const path= require('path')
const helmet= require('helmet')
const cors= require('cors')
const xss= require('xss-clean')
const rateLimiter= require('express-rate-limit')
const port= process.env.PORT || 3500



app.use(express.static('./public'))

app.get('/:page', (req, res, next) => {
  const page= req.params.page
  const filePath= path.join(__dirname, 'public', `${page}.html`)
  res.sendFile(filePath, (err) => {
    if (err) next()
  })
})

app.get('/shop/:page', (req, res, next) => {
  const page= req.params.page
  const filePath= path.join(__dirname, 'public', 'shop', `${page}.html`)
  res.sendFile(filePath, (err) => {
    if (err) next()
  })
})

app.get('/game/:page', (req, res, next) => {
  const page= req.params.page
  const filePath= path.join(__dirname, 'public', 'game', `${page}.html`)
  res.sendFile(filePath, (err) => {
    if (err) next()
  })
})


app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', authenticateUser, cartRouter)
app.use('/api/v1/orders', authenticateUser, orderRouter)

 
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start= async() => {
  try{
    await connectDB(process.env.MONGO_URI)
    console.log('connected to mongodb')
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch(error) {
    console.log(error)
  }
 
}

start()
