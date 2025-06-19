  

const nameInput= document.querySelector('.name')
const addressInput= document.querySelector('.address')
const placeOrderBtn= document.querySelector('.order')
const token= sessionStorage.getItem('token')
const userName= sessionStorage.getItem('name')
const modeToggleBtn= document.querySelector('.fa-sun')
const user= document.querySelector('.user-name')
const errMsgCont= document.querySelector('.error-msg')
const logoutBtn= document.querySelector('.logout-btn')
const homeBtn= document.querySelector('.home')
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


 user.innerHTML= `Hello, ${userName}`

 
 homeBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    })


 logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
    })

let orderTotal;
let cartItemIds=[]
console.log(cartItemIds)

async function renderPayment() {
  try{

  
      let subtotal= 0
      let shippingCost= 0

      const response= await fetch('/api/v1/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data= await response.json()
      console.log(data)
      const cart= data.cartItems

      cart.forEach((cartItem) => {
        subtotal += cartItem.amount * cartItem.product.price
        shippingCost += cartItem.product.shipping ? 0 : 10
     
        cartItemIds.push(cartItem._id)


      })

      const tax= cart.length > 0 ? 2.75 : 0
       orderTotal= subtotal + shippingCost + tax


      const html = `  <div class="money-cont">
        <div class="total-cont">
          <p>Subtotal:</p>
          <p>$${subtotal}</p>
        </div>
        <div class="total-cont">
          <p>Shipping:</p>
          <p>$${shippingCost}</p>
        </div>
        <div class="total-cont">
          <p>Tax:</p>
          <p>$${tax}</p>
        </div>
        <div class="total-cont">
          <p>Order Total:</p>
          <p>$${orderTotal}</p>
        </div>
      </div>
     `

      document.querySelector('.payment-container').innerHTML= html

      cartQuantityHtml(cart)
      
      } catch(error) {
        console.log(error)
      }
     }

     renderPayment()


     async function sendOrders() {

      try{

      const name= nameInput.value 
      const address= addressInput.value

      
     const orderDate= dayjs().format('MMMM D, YYYY h:mm A')
     
     const deliveryDate= dayjs().add(7, 'day').hour(14).minute(30).toISOString()

        const response= await fetch('/api/v1/orders', {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItemIds: cartItemIds,
            name: name,
            address: address,
            orderTotal: orderTotal,
            orderDate: orderDate,
            deliveryDate: deliveryDate
          })
        })

        if(!response.ok) {
          const errData= await response.json()
          throw new Error(errData.msg || 'Error')
        }
        const data= await response.json()
        console.log(data)
      
      
          window.location.href='/shop/orders'

      } catch(error) {
        console.log(error)
        errMsgCont.innerHTML= error.message
        errMsgCont.style.display= 'flex'

        setTimeout(() => {
           errMsgCont.style.display= 'none'
        }, 2000)

      }
     }

     placeOrderBtn.addEventListener('click', () => {
      sendOrders()

    
     })


     
     function cartQuantityHtml(cart) {
        let cartQuantityHtml= 0;

        cart.forEach((cartItem) => {
          cartQuantityHtml += Number(cartItem.amount)
        })

        document.querySelector('.cart-quantity').innerHTML= cartQuantityHtml
        
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

      nameInput.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
          sendOrders()
        }
      })


       addressInput.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
          sendOrders()
        }
      })

    
     
