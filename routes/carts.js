const express= require('express')
const router= express.Router()
const {createCartItem, getAllCartItems, updateCartItem, deleteCartItem}= require('../controllers/carts')

router.route('/').get(getAllCartItems).post(createCartItem)
router.route('/:id').patch(updateCartItem).delete(deleteCartItem)

module.exports= router
  