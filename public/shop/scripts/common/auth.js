const authContMain= document.querySelector('.auth-cont-main')

 export function renderRegisterCont() {
  const existingAuthCont = authContMain.querySelector('.auth-cont')
  if (existingAuthCont) existingAuthCont.remove()

 

  const authCont= document.createElement('div')
  authCont.classList.add('auth-cont')
  authCont.innerHTML= ` 
  <i class="fa-solid fa-rectangle-xmark dark-text"></i>
  <div>Register</div>
  <div>Already have an account? <span class="login reg-login-msg dark-text">Login</span></div>
  <div class="error-msg "></div>
  <div class="details-cont"> 
    <p>Name</p>
    <div class="text-check-cont">
       <input type="text" placeholder="Name" class="name name-input details-input">
       <i class="fa-solid fa-circle-check circle"></i>
       <i class="fa-solid fa-circle-xmark"></i>
    </div> 
    <p class="name-msg short-msg">Too short</p>
  </div>
  <div class="details-cont">
    <p>Email</p>
    <div class="text-check-cont">
     <input type="email" placeholder="Email" class="email email-input details-input">
     <i class="fa-solid fa-circle-check"></i>
     <i class="fa-solid fa-circle-xmark"></i>
    </div>   
  </div>
  <div class="details-cont">
    <p>Password</p>
    <div class="text-check-cont password-eye-cont">
     <input type="password" placeholder="Password" class="password pwd-input details-input">
     <i class="fa-solid fa-eye"></i>
     <i class="fa-solid fa-circle-check"></i>
     <i class="fa-solid fa-circle-xmark"></i>
    </div>  
    <p class="password-msg short-msg">Too short</p>
  </div>
  <div>
    <button class="register-user login-reg-btn dark-btn">Register</button>
  </div>
  `
  authContMain.appendChild(authCont)
  const nameInput= document.querySelector('.name')
  const emailInput= document.querySelector('.email')
  const passwordInput= document.querySelector('.password')

  registerCheck(nameInput, emailInput, passwordInput)

  showPassword(authCont)
   

  const loginUserBtn= authCont.querySelector('.login')
  loginUserBtn.addEventListener('click', () => {
    authCont.remove()
    
   renderLoginCont()
  
  })

  setTimeout(() => {
    document.addEventListener('click', (event) => {
      closeAuthCont(event)
    })
  }, 1000)

    const userRegisterBtn= document.querySelector('.register-user')
  
    
  userRegisterBtn.addEventListener('click', () => {
    const name= document.querySelector('.name').value
    const email= document.querySelector('.email').value
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg')
    registerUser(name, email, password, errorMsg)    

  })

  nameInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
       const name= document.querySelector('.name').value
    const email= document.querySelector('.email').value
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg')
    registerUser(name, email, password, errorMsg)    
    }
  })

  passwordInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
       const name= document.querySelector('.name').value
    const email= document.querySelector('.email').value
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg')
    registerUser(name, email, password, errorMsg)    
    }
  })

  emailInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
       const name= document.querySelector('.name').value
    const email= document.querySelector('.email').value
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg')
    registerUser(name, email, password, errorMsg)    
    }
  })
  
  closeContainer()
}

 
  

async function registerUser(name, email, password, errorMsg) {
  try{
    const response= await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password})
    })

    if(!response.ok) {
      const errData= await response.json()
      throw new Error (errData.msg || 'Error occured!')
    }


    const data= await response.json()
    console.log(data)

    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('name', data.user.name)

    errorMsg.classList.remove('error-msg-cont')
    errorMsg.innerHTML= ''

   
      window.location.href='/shop/products'
     
   

  } catch(error) {
    console.log(error)
    errorMsg.classList.add('error-msg-cont')
    errorMsg.innerHTML= error.message
    setTimeout(() => {
      errorMsg.classList.remove('error-msg-cont')
      errorMsg.innerHTML= ''
    }, 2000)
  }
    

}


export function renderLoginCont() {
     const existingAuthCont = authContMain.querySelector('.auth-cont')
  if (existingAuthCont) existingAuthCont.remove()

 
  const authCont= document.createElement('div')
  authCont.classList.add('auth-cont')
  authCont.innerHTML= ` 
<i class="fa-solid fa-rectangle-xmark dark-text"></i>
<div>Login</div>
<div>Don't have an account? <span class="register reg-login-msg dark-text">Register</span></div>
<div class="error-msg"></div>
<div class="details-cont">
  <p>Email</p>
  <div class="text-check-cont">
    <input type="email" placeholder="Email" class="email email-input details-input">
     <i class="fa-solid fa-circle-check"></i>
     <i class="fa-solid fa-circle-xmark"></i>
  </div> 
</div>
<div class="details-cont">
  <p>Password</p>
  <div class="text-check-cont password-eye-cont">
   <input type="password" placeholder="Password" class="password pwd-input details-input">    
   <i class="fa-solid fa-eye"></i>
  </div>
</div>
<div>
  <button class="login-user login-reg-btn dark-btn">Login</button>
</div>
<div>
  <button class="guest-btn  login-reg-btn dark-btn">Login as Guest/Demo user</button>
</div>
  `
  authContMain.appendChild(authCont)
 const passwordInput= document.querySelector('.password')
  const emailInput= document.querySelector('.email')
  loginCheck(emailInput)

      
  showPassword(authCont)

  const registerUserBtn= authCont.querySelector('.register')
  registerUserBtn.addEventListener('click', () => {
    authCont.remove()
      renderRegisterCont()
    
 
  })
  

  setTimeout(() => {
    document.addEventListener('click', (event) => {
      closeAuthCont(event)
    })
  }, 1000)

    const userLoginBtn= document.querySelector('.login-user')
   
  userLoginBtn.addEventListener('click', () => {
     const email= document.querySelector('.email').value 
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg') 
    loginUser(email, password, errorMsg)

  })

   passwordInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
       
    const email= document.querySelector('.email').value
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg')
    loginUser(email, password, errorMsg)    
    }
  })

  emailInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {

    const email= document.querySelector('.email').value
    const password= document.querySelector('.password').value
    const errorMsg= document.querySelector('.error-msg')
    loginUser(email, password, errorMsg)    
    }
  })
  
  

  const guestBtn= document.querySelector('.guest-btn')
  guestBtn.addEventListener('click', ()=> {
    handleGuestLogin()
  })

  
  closeContainer()
}


async function loginUser(email, password, errorMsg) {
  try{
    const response= await fetch('/api/v1/auth/login' , {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password})
  })

  if(!response.ok) {
    const errData= await response.json()
    throw new Error (errData.msg || 'error occured!')
  }

  const data= await response.json()
  console.log(data)

  sessionStorage.setItem('token', data.token)
  sessionStorage.setItem('name', data.user.name)

  errorMsg.classList.remove('error-msg-cont')
  errorMsg.innerHTML= ''

    window.location.href='/shop/products'
    
   


  } catch(error) {
    console.log(error)

    errorMsg.classList.add('error-msg-cont')
    errorMsg.innerHTML= error.message
    setTimeout(() => {
      errorMsg.classList.remove('error-msg-cont')
      errorMsg.innerHTML= ''
    }, 2000)
   

  }

}

export function registerCheck(nameInput, emailInput, passwordInput) {
  nameInput.addEventListener('input', () => {
    const checkIcon= nameInput.parentElement.querySelector('.fa-circle-check')
    const xmarkIcon= nameInput.parentElement.querySelector('.fa-circle-xmark')
    const nameMsg= document.querySelector('.name-msg')
    
    if(nameInput.value.length >= 3) {
      checkIcon.style.display= 'inline-block'
      xmarkIcon.style.display='none'
      nameMsg.style.display='none'
    }else{
      checkIcon.style.display= 'none'
      xmarkIcon.style.display= 'inline-block'
      nameMsg.style.display='block'
    }

  })

  emailInput.addEventListener('input', () => {
    const checkIcon= emailInput.parentElement.querySelector('.fa-circle-check')
    const xmarkIcon= emailInput.parentElement.querySelector('.fa-circle-xmark')
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(emailPattern.test(emailInput.value)) {
      checkIcon.style.display= 'inline-block'
      xmarkIcon.style.display='none'
    } else{
      checkIcon.style.display= 'none'
      xmarkIcon.style.display= 'inline-block'
    }

  })

  passwordInput.addEventListener('input', () => {
    const checkIcon= passwordInput.parentElement.querySelector('.fa-circle-check')
    const xmarkIcon= passwordInput.parentElement.querySelector('.fa-circle-xmark')
    const passwordMsg= document.querySelector('.password-msg')
  

    if(passwordInput.value.length >= 6) {
      checkIcon.style.display= 'inline-block'
      xmarkIcon.style.display='none'
      passwordMsg.style.display='none'

    } else{
      checkIcon.style.display= 'none'
      xmarkIcon.style.display= 'inline-block'
      passwordMsg.style.display='block'
    }

  })
}

export function loginCheck(emailInput) {
  emailInput.addEventListener('input', () => {
    const checkIcon= emailInput.parentElement.querySelector('.fa-circle-check')
    const xmarkIcon= emailInput.parentElement.querySelector('.fa-circle-xmark')
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(emailPattern.test(emailInput.value)) {
      checkIcon.style.display= 'inline-block'
      xmarkIcon.style.display='none'
    } else{
      checkIcon.style.display= 'none'
      xmarkIcon.style.display= 'inline-block'
    }

  })
}


export function closeAuthCont(event) {
  const authCont= document.querySelector('.auth-cont')
  if(authCont && !authCont.contains(event.target) && !event.target.closest('.login-btn') &&  !event.target.closest('.login') &&  !event.target.closest('.register')) {
    authCont.remove()
    document.removeEventListener('click', closeAuthCont)
  }
}

async function handleGuestLogin() {
  try{
  const response=  await fetch('/api/v1/auth/guest', {
    method: 'POST'
   })

   const data= await response.json()
   console.log(data)

   sessionStorage.setItem('token', data.token)
   sessionStorage.setItem('name', data.user.name)

   window.location.href= '/shop/products'

  } catch(error) {
    console.log(error)
  }
}


function showPassword(authCont) {
  const passwordInput= authCont.querySelector('.password')
  const eyeIcon= authCont.querySelector('.fa-eye')

  eyeIcon.addEventListener('click', () => {
    if(eyeIcon.classList.contains('fa-eye')) {
       eyeIcon.classList.replace('fa-eye', 'fa-eye-slash')
       passwordInput.type= 'text'
    } else {
      eyeIcon.classList.replace('fa-eye-slash', 'fa-eye')
       passwordInput.type= 'password'
    }
  })
}

function closeContainer() {
  const authCont= authContMain.querySelector('.auth-cont')
  const closeBtn= authCont.querySelector('.fa-rectangle-xmark')

  closeBtn.addEventListener('click', () => {
    authCont.remove()
  })
}