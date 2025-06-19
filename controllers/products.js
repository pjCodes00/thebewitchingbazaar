const Product= require('../models/Product')
const {StatusCodes}= require('http-status-codes')
const {BadRequestError, NotFoundError}= require('../errors') 

const getAllProducts= async(req, res) => {
  const{name, price, category, company, shipping, featured, rating, sort}= req.query
  const queryObject= {}

  if(name) {
    queryObject.name= {$regex:name, $options:'i'}
  }

  if(category && category !== 'All'){
    queryObject.category= category
  }

  if(company && company !== 'All') {
    queryObject.company= company
  }

  if(shipping) {
    queryObject.shipping= shipping === 'true'
  }

  if(featured) {
    queryObject.featured= featured === 'true'
  }

  if(rating) {
    queryObject.rating = { $lte: Number(rating)} 
  }

  if (price) {
    queryObject.price = { $lte: Number(price)}
  }


  let result= Product.find(queryObject)

  if(sort && sort !== 'All') {

    let sortList= sort
    const sortVal= sortList.toLowerCase()

    if (sortVal === 'a-z') {
      sortList = 'name'
    }

    if (sortVal === 'z-a') {
      sortList= '-name'
    }

    if(sortVal === 'high') {
      sortList = '-price'
    } 

    if(sortVal === 'low') {
      sortList= 'price'
    }
    
    if(!sortList.includes('_id')) {
      sortList += ' _id'
    }
    result= result.sort(sortList)

  } else {
    result= result.sort('createdAt _id')
  }

  const page= Number(req.query.page) || 1
  const limit= 10
  const skip= (page - 1) * limit

  result= result.limit(limit).skip(skip)
  
  const products= await result
  res.status(StatusCodes.OK).json({products, nbHits: products.length})
}

const getProduct= async(req, res) => {
  const product= await Product.findOne({_id: req.params.id})
  res.status(StatusCodes.OK).json({product})
}

module.exports= {getAllProducts, getProduct}