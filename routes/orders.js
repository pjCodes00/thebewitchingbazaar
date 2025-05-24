const express= require('express')
const router= express.Router()
const{createOrder, getAllOrders, cancelSingleOrder}= require('../controllers/orders')

router.post('/', createOrder)

router.get('/', getAllOrders)

router.patch('/:id', cancelSingleOrder)

module.exports= router