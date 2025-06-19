
       const token= sessionStorage.getItem('token')
       const userName= sessionStorage.getItem('name')
       const modeToggleBtn= document.querySelector('.fa-sun')
       const user= document.querySelector('.user-name')
       const logoutBtn= document.querySelector('.logout-btn')
       const homeBtn= document.querySelector('.home')

        user.innerHTML= `Hello, ${userName}`

        window.addEventListener('load', cartQuantityHtml);
        homeBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    })


        logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    })

      async function renderCart() {
        try{

       
       const response=  await fetch('/api/v1/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
       })

       const data= await response.json()
       console.log(data)

       const cart= data.cartItems

       if(cart.length < 1) {
        document.querySelector('.cart-container').innerHTML= `
        <div class="no-product-msg">No cart items to show!</div>
        `
         document.querySelector('.payment-container').style.border= 'none'
         document.querySelector('.payment-container').style.backgroundColor= 'none'
          document.querySelector('.payment-container').innerHTML= ''

          cartQuantityHtml()

        return;
      }

        let html='';
        cart.forEach((cartItem) => {

        
        const colorHTML= cartItem.color
         ? ` <input type="radio" class="color-input ${cartItem.color}">`
         : `<p>No color</p>` 

         const shipping= cartItem.product.shipping ? 'Free' : '$10'

          html += ` <div class="grid-box">
        <div class="image-grid">
          <img class="image" src="${cartItem.product.image}">
        </div>
        <div class="details-grid">
          <p>${cartItem.product.name}</p>
          <div class="color-cont">
            <p>Color: </p>
            ${colorHTML} 
          </div>
        </div>
        <div class="quantity-grid">
          <div class="quantity-cont info-cont">
             <p>Amount</p>
            <Select class="new-amount quantity-select" data-cart-item-id="${cartItem._id}">
            ${renderAmount(cartItem.amount)}
            </Select>
           </div>
           <div>
            <p>Shipping: ${shipping}</p>
           </div>
        </div>
        <div class="pay-grid info-cont">
          <p>$${cartItem.product.price}</p>
          <button class="remove remove-btn dark-btn" data-cart-item-id="${cartItem._id}">Remove item</button>
        </div>
      </div>  `

        })

        document.querySelector('.cart-container').innerHTML= html

       removeItem()
        cartQuantityHtml()
        renderPayment(cart)
        updateAmount()

       } catch(error) {
        console.log(error)
       }
      }

      renderCart()

       function updateAmount() {
        try{
        
        const newAmountSelect= document.querySelectorAll('.new-amount')
       
        newAmountSelect.forEach((selectOption) => {
          selectOption.addEventListener('change', async() => {
            const newAmount= selectOption.value 
            const cartItemId= selectOption.dataset.cartItemId

            
        const response= await fetch(`/api/v1/cart/${cartItemId}`, {
          method: 'PATCH',
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amount: newAmount
          })
        })

        const data= await response.json()
        console.log(data)



        renderCart()
          })
        })

        } catch(error) {
          console.log(error)
        }
      }
     

      function renderAmount(selectedAmount) {

        let options='';
        
        for (let i= 1; i <= 5; i++) {
          options += `<option value="${i}" ${Number(selectedAmount) === i ? 'selected' : ''}>${i}</option>`
        }

        return options;
      }

      function removeItem() {
        try{
        const removeItemBtn= document.querySelectorAll('.remove')
        removeItemBtn.forEach((btn) => {
          btn.addEventListener('click', async() => {
           const cartItemId= btn.dataset.cartItemId

           const response= await fetch(`/api/v1/cart/${cartItemId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
           })

           const data= await response.json()
           console.log(data)
           
            renderCart()
           

          })
        })

          } catch(error) {
            console.log(error)
          }
      }
     

   async function cartQuantityHtml() {
      try{

     
    const response = await fetch('/api/v1/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
   const cart = data.cartItems;
  
      let cartQuantityHtml= 0;

      cart.forEach((cartItem) => {
        cartQuantityHtml += Number(cartItem.amount)
      })

      document.querySelector('.header3').innerHTML= `Cart: ${cartQuantityHtml}`

      document.querySelector('.cart-quantity').innerHTML= cartQuantityHtml

      } catch(error) {
        console.log(error)
      }
      
     }

     
   

     window.addEventListener('pageshow', (event) => {
  if (event.persisted || performance.getEntriesByType('navigation')[0].type === 'back_forward') {
    cartQuantityHtml(); 
  }
});

     function renderPayment(cart) {
      let subtotal= 0
      let shippingCost= 0

   
      cart.forEach((cartItem) => {
      
        subtotal += cartItem.amount * cartItem.product.price
        shippingCost += cartItem.product.shipping ? 0 : 10

      })

      const tax= cart.length > 0 ? 2.75 : 0
      const orderTotal= subtotal + shippingCost + tax


      const html = `  <div class="money-cont">
        <div class="total-cont">
          <p>Subtotal:</p>
          <p>$${subtotal}</p>
        </div>
        <div class="total-cont">
          <p>Shipping:</p>
          <p class="shipping">$${shippingCost}</p>
        </div>
        <div class="total-cont">
          <p>Tax:</p>
          <p class="tax">$${tax}</p>
        </div>
        <div class="total-cont">
          <p>Order Total:</p>
          <p class="order-total">$${orderTotal}</p>
        </div>
      </div>
      <div class="err-msg-cont">
       Cannot Proceed as cart is empty!
      </div>
      <div class="proceed-cont">
        <button class="checkout checkout-btn dark-btn">Proceed to checkout</button>
      </div>`

      document.querySelector('.payment-container').innerHTML= html


      const checkoutBtn= document.querySelector('.checkout')
      const errMsgCont= document.querySelector('.err-msg-cont')

        checkoutBtn.addEventListener('click', () => {
          if (cart.length < 1) {
            errMsgCont.style.display='block'

            setTimeout(() => {
               errMsgCont.style.display='none'
            }, 2000)
           return;
          }

        window.location.href='/shop/checkout'
})


      
     }



    modeToggleBtn.addEventListener('click', () => {
        const body= document.body 

        body.classList.toggle('white-mode')

        if(modeToggleBtn.classList.contains('fa-sun')) {
          modeToggleBtn.classList.replace('fa-sun', 'fa-moon')
        } else{
          modeToggleBtn.classList.replace('fa-moon', 'fa-sun')
        }
      })
      


  



     