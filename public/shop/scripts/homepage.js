

  const loginBtns= document.querySelectorAll('.login-btn')
  const toggleBtn= document.querySelector('.fa-sun')
  const backHomeBtn= document.querySelector('.back-home-btn')
  import {renderRegisterCont} from './common/auth.js'
 

  backHomeBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior: 'smooth'})
  })
 

  loginBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      renderRegisterCont()
    })
  })



 
  toggleBtn.addEventListener('click', () => {
    const body= document.body

    body.classList.toggle('white-mode')

    if(toggleBtn.classList.contains('fa-sun')) {
      toggleBtn.classList.replace('fa-sun', 'fa-moon')
    } else{
      toggleBtn.classList.replace('fa-moon', 'fa-sun')
    }
  })

 
 
