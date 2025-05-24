 

    const token= sessionStorage.getItem('token')
    const userName= sessionStorage.getItem('name')
    const modeToggleBtn= document.querySelector('.fa-sun')
    const user= document.querySelector('.user-name')
    const logoutBtn= document.querySelector('.logout-btn')
    const homeBtn= document.querySelector('.home')
    const totalOrdersCont= document.querySelector('.total-orders')
    const activeOrdersCont= document.querySelector('.active-orders')
    const cancelledOrdersCont= document.querySelector('.cancelled-orders')
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

    async function renderOrders() {
      const response= await fetch('/api/v1/orders', {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })

      const data= await response.json()
      console.log(data)

      const orders= data.orders

      getTotalOrders(orders)

      if(orders.length < 1) {
        document.querySelector('.grid-container').innerHTML= `
        <div class="no-product-msg">No orders to show!</div>
        `

        return;
      }

     
      
      let html=''
      orders.forEach((order) => {

       

        const productsHtml= order.items.map(cartItem => 
          `<p>${cartItem.product.name} (${cartItem.amount})</p>`
        ).join('')

        const status= order.status
        const countDownMsg= order.countDownMsg

        const orderDate = dayjs(order.orderDate).format('MMMM D, YYYY h:mm A')
       const  deliveryDate = status !== 'Cancelled' 
          ?   dayjs(order.deliveryDate).format('MMMM D, YYYY h:mm A')
          : ''
     
         

        html += ` 
      <div class="grid-box">
        <div class="grid-details">${order.name}</div>
          <div class="grid-details">${order.address}</div>
          <div class="grid-details products-detail">
            ${productsHtml}
          </div>
          <div class="grid-details">$${order.orderTotal}</div>
          <div class="grid-details ">
            <p>${orderDate}</p>
          </div>
          <div class="grid-details delivery-status">
            <p>${deliveryDate}</p>
            <!--<p>3:00pm</p>-->
            <p class="status-msg">Status: <span class="status">${status}</span><span class="countdown">${countDownMsg}</span></p>
            ${status !== 'Cancelled' && status !== 'Delivered' ? `
            <button class="cancel-btn dark-btn" data-order-id="${order._id}">Cancel Order</button>
            <div class="cancel-order-cont" data-order-id="${order._id}">
              <i class="fa-solid fa-rectangle-xmark dark-text"></i>
              <p class="cancel-msg">Are you sure you want to cancel this order?</p>
              <div class="cancel-btns">
                <button class="yes-btn yes-no-btn dark-btn">Yes</button>
                <button class="no-btn yes-no-btn dark-btn">No</button>
              </div>
            </div>
            `: ''}
          </div>
       </div>`

      })

      document.querySelector('.grid-container').innerHTML= html

      

      const cancelOrderBtns= document.querySelectorAll('.cancel-btn')
        cancelOrderBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
           const orderId= btn.dataset.orderId

           const cancelOrderCont= document.querySelector(`.cancel-order-cont[data-order-id="${orderId}"]`)
           
           cancelOrderCont.style.display='flex'

           closeCancelOrderCont(cancelOrderCont)

           const yesBtn= cancelOrderCont.querySelector('.yes-btn')
           const noBtn= cancelOrderCont.querySelector('.no-btn')


           if (yesBtn) {
           yesBtn.addEventListener('click', () => {
            cancelOrder(orderId, cancelOrderCont)

           })
          }
          
          if(noBtn) {
           noBtn.addEventListener('click', () => {
            cancelOrderCont.style.display='none'
           })
          }


          })
        })
      
    }
  
    renderOrders()

    async function cancelOrder(orderId, cancelOrderCont) {

      try{
     
      const response= await fetch(`/api/v1/orders/${orderId}`, {
        method:'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
       
      })

      if(!response.ok) {
        const errData= await response.json()
        throw new Error(errData.msg || 'Error')
      }
      const data= await response.json()
      console.log(data)

     
      renderOrders()
   
    } catch(error) {
      console.log(error)
      console.log(error.message)

      const msg= cancelOrderCont.querySelector('.cancel-msg')
      const msgBtns= cancelOrderCont.querySelector('.cancel-btns')

      if(msg) {
        msg.textContent= error.message
        
      }
      
      if(msgBtns) {
        msgBtns.innerHTML=` <button class="ok-btn dark-btn">Ok</button>`
      }
      
      const okBtn= cancelOrderCont.querySelector('.ok-btn')
      if (okBtn) {
    okBtn.addEventListener('click', () => {
      cancelOrderCont.style.display = 'none'
    })
  }
    }
      
   

    }

   async function cartQuantityHtml() {
       
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
       
     }
     cartQuantityHtml()

     
     
     modeToggleBtn.addEventListener('click', () => {
        const body= document.body 

        body.classList.toggle('white-mode')

        if(modeToggleBtn.classList.contains('fa-sun')) {
          modeToggleBtn.classList.replace('fa-sun', 'fa-moon')
        } else{
          modeToggleBtn.classList.replace('fa-moon', 'fa-sun')
        }
      })
 
      function closeCancelOrderCont(cancelOrderCont) {
           
        const closeBtn= cancelOrderCont.querySelector('.fa-rectangle-xmark')

        closeBtn.addEventListener('click', () => {
          cancelOrderCont.style.display='none'
        })
      }


      function getTotalOrders(orders) {

        const activeOrders= orders.filter(order => order.status !== 'Cancelled' && order.status !== 'Delivered')
        const cancelledOrders= orders.filter(order => order.status === 'Cancelled')
        

        
          totalOrdersCont.innerHTML= `Total orders: ${orders.length}`

        activeOrdersCont.innerHTML=`Active orders: ${activeOrders.length}`
        cancelledOrdersCont.innerHTML=`Cancelled orders: ${cancelledOrders.length}`
      }
    
     