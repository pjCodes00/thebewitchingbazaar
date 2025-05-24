  

     const token= sessionStorage.getItem('token')
     const userName= sessionStorage.getItem('name')
     const searchBtn= document.querySelector('.search-btn')
     const backBtn= document.querySelector('.back-btn')
     const nextBtn= document.querySelector('.next-btn')
     const pageBtns= document.querySelectorAll('.page-btn1, .page-btn2, .page-btn3')
     const modeToggleBtn= document.querySelector('.fa-sun')
     const sidebarBtn= document.querySelector('.fa-toggle-on')
     const sidebar= document.querySelector('.sidebar')  
     const resetBtn= document.querySelector('.reset-btn')
     const logoutBtn= document.querySelector('.logout-btn')
     const user= document.querySelector('.user-name')
     const authElements= document.querySelectorAll('.auth')
     const homeBtn= document.querySelector('.home')
     const prodTooltip= document.querySelector('.prod-tooltip')
     const gridContainer= document.querySelector('.grid-container')

     
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
       } else {
        user.innerHTML= `Hello, ${userName}`
       }
    
     
     let productName;
     let category;
     let company;
     let sort;
     let shipping;
     let featured;
     let price;
     let rating;
     let progressBar;
     let ratingInput;

     let currentPage= 1;
     const totalPages= 3

     let isWhiteMode= false;

    
     async function filterAndRenderProducts(page= 1) {
      try{

      productName= document.querySelector('.search-name').value 
      category= document.querySelector('.select-category').value
      company= document.querySelector('.select-company').value
      sort= document.querySelector('.select-sort').value
      shipping= document.querySelector('.shipping').checked
      featured= document.querySelector('.featured').checked  

      const query =[
        `page=${page}`,
        (price !== null && price !== undefined) && `price=${price}`,
        (rating !== null && rating !== undefined) && `rating=${rating}`,
        productName && `name=${productName}`,
        category && category !== 'All' && `category=${category}`,
        company && company !== 'All' && `company=${company}`,
        shipping && `shipping=${shipping}`,
        featured && `featured=${featured}`,
        sort && sort !== 'All' &&`sort=${sort}`

      ].filter(Boolean).join('&')

      const response= await fetch(`/api/v1/products?${query}`, {
           headers:{
            'Authorization': `Bearer ${token}`
           }
        })

        if(response.status === 429) {
           document.querySelector('.grid-container').innerHTML= `
        <div class="no-product-msg">Too many requests, try after a few seconds!</div>
        `
        window.scrollTo({top: 0, beahvior: 'smooth'})

        return;
        }
        
        const data= await response.json()
        console.log(data)

        const products= data.products 

        let html=''

        currentPage= page;
        updatePaginationButtons()

        if(products.length < 1) {
            document.querySelector('.grid-container').innerHTML=` 
            <div class="no-product-msg">
              No products to show
            </div>  
            `
            window.scrollTo({top:0, behavior:'smooth'})
            return;
          }
        products.forEach((product) => {
          
          html+= ` 
      <div class="grid-box" data-product-id="${product._id}">
        <div class="image-cont">
          <img class="image" src="${product.image}">
        </div>
        <div class="details-cont">
          <p>${product.name}</p>
          <p class="prod-price">$${product.price}</p>
          <p class="prod-category">Category: ${product.category}</p>
        </div>
      </div> 
       `
       currentPage= page
       updatePaginationButtons()
       window.scrollTo({top:0, behavior:'smooth'})

        })
        document.querySelector('.grid-container').innerHTML= html

        getSingleProduct()

       const gridBoxes= document.querySelectorAll('.grid-box')
        addTooltip(gridBoxes)
      } catch(error) {
        console.log(error)
      }
   
     }

     filterAndRenderProducts()

     searchBtn.addEventListener('click', () => {
      filterAndRenderProducts()
     })

  


      function getSingleProduct(){
      const gridBox= document.querySelectorAll('.grid-box')
     
         gridBox.forEach((box) => {
          box.addEventListener('click', () => {
        const productId= box.dataset.productId

        window.location.href=`/shop/product?productId=${productId}`
  })
})
      }
      getSingleProduct()

      
      function renderPrice() {
        const html= `
       <p>Select Price</p>
        <input class="progress-bar sidebar-bar price-input" type="range" value="1500" min="0" max="1500">
        <div class="price-container">
          <p class="price-update">$1500</p>
          <p>$1500</p>
        </div>
        `
        document.querySelector('.price-cont').innerHTML=html

         progressBar= document.querySelector('.progress-bar')
        progressBar.addEventListener('input', () => {
          const priceUpdate= document.querySelector('.price-update')
           price= Number(progressBar.value)

          priceUpdate.innerHTML= `$${price}`
           
          updateModeStyles()
           filterAndRenderProducts();
        

        })

        
      }
      renderPrice()

      function renderRating() {
        const html= ` 
        <p>Select rating</p>
        <input type="range" value="5" min="0" max="5" class="rating-input sidebar-bar">
        <div class="rating-num">
          <p class="rating">5</p>
          <p>5</p>
        </div>
        `
        document.querySelector('.rating-cont-main').innerHTML= html

         ratingInput= document.querySelector('.rating-input')
        ratingInput.addEventListener('input', () => {
           rating= ratingInput.value
          const ratingUpdate= document.querySelector('.rating')

          ratingUpdate.innerHTML= `${rating}`

         updateModeStyles()
             filterAndRenderProducts();

        })

      }

      renderRating()

    


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
     
     function updatePaginationButtons(){
     backBtn.disabled= currentPage === 1
     nextBtn.disabled= currentPage === totalPages
     
      pageBtns.forEach((btn, index) => {
        btn.classList.toggle('active', currentPage === index + 1)
      })
     }

     pageBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        filterAndRenderProducts(index + 1)
      })
     })

     backBtn.addEventListener('click', () => {
      if(currentPage > 1) {
        filterAndRenderProducts(currentPage - 1)
      }
     })

     nextBtn.addEventListener('click', () => {
      if(currentPage < totalPages) {
        filterAndRenderProducts(currentPage + 1)
      }
     })

     function updateModeStyles() {
       if(progressBar) {
        
          const percent= (price / progressBar.max) * 100

          progressBar.style.background= isWhiteMode 
               ? `linear-gradient(to right, pink ${percent}%, white ${percent}%)`
               : `linear-gradient(to right, rgb(243, 9, 243) ${percent}%, rgb(62, 61, 61) ${percent}%)`

       }

       if(ratingInput) {
            const percent= (rating / ratingInput.max) * 100

          ratingInput.style.background= isWhiteMode
             ? `linear-gradient(to right, pink ${percent}%, white ${percent}%)`
             : `linear-gradient(to right, rgb(243, 9, 243) ${percent}%, rgb(62, 61, 61) ${percent}%)`
       }


     }

 

     modeToggleBtn.addEventListener('click', () => {
      const body= document.body

      body.classList.toggle('white-mode')

      if(modeToggleBtn.classList.contains('fa-sun')){
        modeToggleBtn.classList.replace('fa-sun', 'fa-moon')
        isWhiteMode= true;
      
        
      } else{
        modeToggleBtn.classList.replace('fa-moon', 'fa-sun')
        isWhiteMode= false
      }

        updateModeStyles()
    })
 

    sidebarBtn.addEventListener('click', () => {
      console.log('Sidebar toggle clicked');
     if(sidebarBtn.classList.contains('fa-toggle-on')) {
      sidebarBtn.classList.replace('fa-toggle-on', 'fa-toggle-off')
      sidebar.style.transform= 'translateX(-250px)'
      
      gridContainer.style.transform='translateX(-150px)'
      gridContainer.style.width= '1100px'
       gridContainer.style.minHeight='650px'
      gridContainer.style.columnGap='30px'
      
     } else if (sidebarBtn.classList.contains('fa-toggle-off')) {
      sidebarBtn.classList.replace('fa-toggle-off', 'fa-toggle-on')
       sidebar.style.transform= 'translateX(0)'
       gridContainer.style.transform='translateX(0)'
      gridContainer.style.columnGap='20px'
       gridContainer.style.width='1000px'
       gridContainer.style.minHeight='500px'
     }

    })

    resetBtn.addEventListener('click', () => {
      document.querySelector('.search-name').value = '';
  document.querySelector('.select-category').value = 'All';
  document.querySelector('.select-company').value = 'All';
  document.querySelector('.select-sort').value = 'All';
  document.querySelector('.shipping').checked = false;
  document.querySelector('.featured').checked = false;

 
  const progressBar = document.querySelector('.progress-bar');
  const priceUpdate = document.querySelector('.price-update');
  progressBar.value = 1500;
  priceUpdate.innerHTML = '$1500';
  const percentPrice= (progressBar.value / progressBar.max) * 100
  progressBar.style.background= `linear-gradient(to right, rgb(243, 9, 243) ${percentPrice}%, black ${percentPrice}%)`


  const ratingInput = document.querySelector('.rating-input');
  const ratingUpdate = document.querySelector('.rating');
  ratingInput.value = 5;
  ratingUpdate.innerHTML = '5'; 
  const percentRating= (ratingInput.value / ratingInput.max) * 100
  ratingInput.style.background= `linear-gradient(to right, rgb(243, 9, 243) ${percentRating}%, black ${percentRating}%)`


 
  productName = '';
  category = 'All';
  company = 'All';
  sort = 'All';
  shipping = false;
  featured = false;
  price = null;
  rating = null;
 
   

  currentPage = 1;
 
  filterAndRenderProducts();

    })

 

    function addTooltip(gridBoxes) {
      gridBoxes.forEach((box) => {
        box.addEventListener('mousemove', (e) => {
          prodTooltip.style.display='block'
          prodTooltip.style.left=`${e.pageX + 15}px`
          prodTooltip.style.top=`${e.pageY + 15}px`
        })

        box.addEventListener('mouseleave', (e) => {
          prodTooltip.style.display='none'
        })
      })
    }

     const searchInput= document.querySelector('.search-name')
     searchInput.addEventListener('input', () => {
      filterAndRenderProducts()
      
     })

      const selectCategory= document.querySelector('.select-category')
     selectCategory.addEventListener('input', () => {
        filterAndRenderProducts()
     })

      const selectCompany= document.querySelector('.select-company')
     selectCompany.addEventListener('input', () => {
       filterAndRenderProducts()
        
      
     })

     const selectSort= document.querySelector('.select-sort')
     selectSort.addEventListener('input', () => {
       filterAndRenderProducts()
        
     })

      const shippingInput= document.querySelector('.shipping')
     shippingInput.addEventListener('input', () => {
      filterAndRenderProducts()
     })

     const featuredInput= document.querySelector('.featured')
     featuredInput.addEventListener('input', () => {
       filterAndRenderProducts()
         
     })

     
   

