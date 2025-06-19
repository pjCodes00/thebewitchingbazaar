

     const modeToggleBtn= document.querySelector('.fa-sun')
     const token= sessionStorage.getItem('token')
     const userName= sessionStorage.getItem('name')
     const user= document.querySelector('.user-name')
     const authElements= document.querySelectorAll('.auth')
     const logoutBtn= document.querySelector('.logout-btn')
     const homeBtn= document.querySelector('.home')
     const loginCont= document.querySelector('.login-container')
     const signupBtn= document.querySelector('.signup-btn')
    import {renderRegisterCont} from './common/auth.js'
     
     homeBtn.addEventListener('click', () => { 
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    })

     logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    })

     if(!token) {
       authElements.forEach((element) => {
        element.style.display= 'none'
       })
     } else{
        user.innerHTML= `Hello, ${userName}`
     }

  let colorCont;

      async function renderProduct() {
         try{

        

        const url= new URL(window.location.href)
        const productId= url.searchParams.get('productId')

        const response= await fetch(`/api/v1/products/${productId}` /*, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }*/)

        const data= await response.json()
        console.log(data)

        const product= data.product
         const shipping= product.shipping ? 'Free' : '$10'
        
          const html= `

       <div class="details-cont-sub">
          <div></div>
          <p class="product-name">${product.name}</p>
          <p class="company-cont"><span class="details">Company:</span> ${product.company}</p>
          <p class="price-cont"><span class="details">Price:</span> $${product.price}</p>
          <div class="rating-cont"> 
            <p class="details">Rating:</p>
            <span class="rating"></span>
          </div>
          <p>${product.description}</p>
       </div>
       <div class="color-cont-main">
        <p class="details">Colors:</p>
        <div class="color-cont">
          <!--<input type="radio" name="color" class="color-input red">
          <input type="radio" name="color" class="color-input green">
          <input type="radio" name="color" class="color-input purple">-->
        </div>
      </div>
      <div class="quantity-grid">
        <p class="details">Amount:</p>
        <Select class="amount">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>  
        </Select> 
      </div> 
      <div class="shipping-cont">
          <span class="details">Shipping:</span> ${shipping}
      </div>
      <div class="add-to-cart">
       <button class="cart cart-btn dark-btn" data-product-id="${product._id}">Add to cart</button>
      </div>
        `
       
        const image= document.querySelector('.image')
        image.src= `${product.image}`

        

        document.querySelector('.details-cont-main').innerHTML= html

       
        renderColors(product)
        renderRating(product)

        const cartBtn= document.querySelector('.cart')

      cartBtn.addEventListener('click', async() => {
        if(!token) {
          loginCont.style.display= 'flex'

          document.querySelector('.blur-overlay').style.display= 'block'

          closeLoginContainer()

            signupBtn.addEventListener('click', () => {
              event.stopPropagation()
              loginCont.style.display= 'none'
              document.querySelector('.blur-overlay').style.display = 'none';

              renderRegisterCont()
            

              
            })
    

          setTimeout(() => {
            document.addEventListener('click', (event) => {
           closeLoginCont(event)
            }),{ once: true }
          }, 1000)

          return;
        }
        const productId= cartBtn.dataset.productId

        const amount= Number(document.querySelector('.amount').value)

        const selectedColorInput= document.querySelector('input[name="color"]:checked')
        const selectedColor= selectedColorInput ? selectedColorInput.classList[1] : null

        addToCart(productId, amount, selectedColor)

      })
        
      } catch(error) {
        console.log(error)
      }
        
      }

      renderProduct()

      
      function renderColors(product) {

        if(product && product.colors && Array.isArray(product.colors) && product.colors.length > 0){

          const colorsHTML= product.colors.map(color => `<input type="radio" name="color" class="color-input ${color}">`).join('')

           colorCont= document.querySelector('.color-cont').innerHTML=colorsHTML
        

        } else {
           colorCont= document.querySelector('.color-cont').innerHTML='No color variation available'
        
        }

      }

      function renderRating(product) {
      

        if(product && !product.rating){
          document.querySelector('.rating').innerHTML= 'No rating available'
          return;
        }

        const fullStars= Math.floor(product.rating)
        const halfStars= (product.rating % 1) >= 0.5
        const emptyStars= 5 - fullStars - (halfStars ? 1 : 0)

        let starsHTML=''
       let i='';
        for(i = 0; i < fullStars; i++) {
          starsHTML+= '&#9733;'
        }

        if(halfStars){
          starsHTML+= '&#9734;'
        }

        for(i=0; i < emptyStars; i++) {
           starsHTML += '&#9734;'
        }

        document.querySelector('.rating').innerHTML= starsHTML
      }



      async function addToCart(productId, amount, selectedColor) {
        const errContainer= document.querySelector('.error-container')
        if(!selectedColor && colorCont !== 'No color variation available'){
          errContainer.style.display= 'flex'

          document.addEventListener('click', (event) => {
            closeErrCont(event, errContainer)
          })

          setTimeout(() => {
            errContainer.style.display='none'
          }, 1000)
         
          return;
        }
            try{
              const response= await fetch('/api/v1/cart', {
                method: 'POST',
                headers:{
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  productId: productId,
                  amount: Number(amount),
                  color: selectedColor
                })
              })

              if(!response.ok) {
                const errData= await response.json()
                throw new Error(errData.msg ||'error')
              }
              const data= await response.json()
              console.log(data)

          

          window.location.href= '/shop/cart'

            } catch(error) {
              console.log(error.message)
            }
           
             

      }



      
     async function cartQuantityHtml() {
      try{

      
      if(!token) return;
 
        const response=  await fetch('/api/v1/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
       })

       const data= await response.json()
       console.log(data)

       const cart= data.cartItems

        let cartQuantityHtml= 0
        cart.forEach((cartItem) => {
          cartQuantityHtml += Number(cartItem.amount)
        })

       
        document.querySelector('.cart-quantity').innerHTML= cartQuantityHtml

        
      } catch(error) {
        console.log(error)
      }
        
      }
      cartQuantityHtml()


     window.addEventListener('pageshow', (event) => {
  if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
    cartQuantityHtml()
  }
});

      modeToggleBtn.addEventListener('click', () => {
        const body= document.body 

        body.classList.toggle('white-mode')

        if(modeToggleBtn.classList.contains('fa-sun')) {
          modeToggleBtn.classList.replace('fa-sun', 'fa-moon')
        } else{
          modeToggleBtn.classList.replace('fa-moon', 'fa-sun')
        }
      })

    
      
      function closeLoginCont(event) {
        if(loginCont && !loginCont.contains(event.target) && !event.target.closest('.cart') && !event.target.classList.contains('signup-btn')) {
          loginCont.style.display= 'none'
           document.querySelector('.blur-overlay').style.display= 'none'
          document.removeEventListener('click', closeLoginCont)
        }
      } 

      function closeErrCont(event, errContainer) {
        if(errContainer && !errContainer.contains(event.target) && !event.target.classList.contains('cart')) {
          errContainer.style.display= 'none'
          document.removeEventListener('click', closeErrCont)
        }
      }

  function closeLoginContainer() {
  const loginCont= document.querySelector('.login-container')
  const closeBtn= loginCont.querySelector('.fa-rectangle-xmark')

  closeBtn.addEventListener('click', () => {
    loginCont.style.display='none'
     document.querySelector('.blur-overlay').style.display= 'none'
  })
}

     