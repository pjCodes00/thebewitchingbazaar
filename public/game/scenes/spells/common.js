const blurOverlay= document.getElementById('blur-overlay')
const errMsgCont= document.querySelector('.err-msg-cont')
const okBtn= errMsgCont.querySelector('.ok-btn')
const errText= errMsgCont.querySelector('.err-msg')
const extractionMsgCont= document.querySelector('.extraction-msg-cont')
const okPotionBtn= extractionMsgCont.querySelector('.ok-potion-btn')


export function handleOkBtn(scene) {
okBtn.addEventListener('click', () => {
  errMsgCont.style.display='none'
  blurOverlay.style.display='none'
  scene.input.enabled= true
  toggleDomBtns(true)
})
}

export function handleOkPotionBtn(scene) {
okPotionBtn.addEventListener('click', () => {
  extractionMsgCont.style.display='none'
  blurOverlay.style.display='none'
  scene.input.enabled= true
  toggleDomBtns(true)
})
}

export function handleWishMsg(scene) {
  errMsgCont.style.display='flex'
  errText.innerHTML= 'Please write a wish!'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function handleSpoonMsg(scene) {
  errMsgCont.style.display='flex'
  errText.innerHTML= 'Please add all ingredients into cauldron before mixing. Please place the spoon in its position!'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)

}

export function handleBrewMsg(scene) {
     
  errMsgCont.style.display='flex'
  errText.innerHTML= 'Please stir the ingredients!'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function handleExtractionMsg(scene){
     
  extractionMsgCont.style.display='flex'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function handleStepMsg(scene) {
  errMsgCont.style.display='flex'
  errText.innerHTML= 'Please complete the step!'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function handleCompleteMsg(scene) {
  errMsgCont.style.display='flex'
  errText.innerHTML= 'Please complete all steps before proceeding!'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function handleHeartsMsg(scene) {
  errMsgCont.style.display='flex'
  errText.innerHTML= 'Please check all the white hearts to proceed!'
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function handleIngredientMsg(scene, spellName) {
  errMsgCont.style.display='flex'
  errText.innerHTML= `Cannot add ${spellName} twice!`
  blurOverlay.style.display= 'block'
  scene.input.enabled= false
  toggleDomBtns(false)
}

export function toggleDomBtns(state) {
  const restartBtn = document.querySelector('.restart-btn')
  const startBtn = document.querySelector('.start-btn')
  const xBtn = document.querySelector('.fa-rectangle-xmark')
  const brewBtn= document.querySelector('.brew-btn')
  const comppleteBtnAll= document.querySelector('.complete-btn-all')
  const fold= document.querySelector('.fold')


  if (!restartBtn || !startBtn || !xBtn || !brewBtn || !comppleteBtnAll || !fold) {
    console.warn('One or more DOM elements not found in toggleDomBtns.')
    return
  }
  const pointer= state ? 'auto' : 'none'
  document.querySelector('.brew-btn').style.pointerEvents= pointer
  document.querySelector('.complete-btn-all').style.pointerEvents= pointer
  document.querySelector('.fold').style.pointerEvents= pointer
}

export function handleVisibility(scene) {
  const extractionVisible= extractionMsgCont.style.display === 'flex'
  const errVisible= errMsgCont.style.display === 'flex'

  if(extractionVisible || errVisible) {
    blurOverlay.style.display= 'block'
    blurOverlay.style.zIndex = '100'
    toggleDomBtns(false)
    scene.input.enabled= false
  } else {
    blurOverlay.style.display= 'none'
    blurOverlay.style.zIndex = '100'
    toggleDomBtns(true)
    scene.input.enabled= true
    
  }
}


export function spawnBubble(scene, bubbleGroup, colorBubble, cauldronOpenCircle, tint) {
  const angle= Phaser.Math.FloatBetween(0, Math.PI * 2)
  const radius= Math.sqrt(Phaser.Math.FloatBetween(0, 3)) * (cauldronOpenCircle.radius - 10)

  const x = cauldronOpenCircle.x + Math.cos(angle) * radius;
  const y = cauldronOpenCircle.y + Math.sin(angle) * radius;

  

  const sizeType= Phaser.Math.Between(1, 3)
  let scale, riseSpeed;

  

  switch (sizeType) {
    case 1:
      scale= Phaser.Math.FloatBetween(0.02, 0.05);
      riseSpeed= 10;
      break;
    case 2:
      scale= Phaser.Math.FloatBetween(0.04, 0.06);
      riseSpeed= 25;
      break;
    case 3:
      scale= Phaser.Math.FloatBetween(0.08, 0.1);
      riseSpeed= 15;
      break;
  }

  const bubble = scene.add.image(x, y, colorBubble).setScale(scale).setAlpha(1).setTint(tint).setDepth(50);
 
  scene.tweens.add({
    targets: bubble,
    y: y - riseSpeed,
    alpha: 0,
    duration: Phaser.Math.Between(500, 1000),
    onComplete: () => {
      bubble.destroy()
    }

  });
  bubbleGroup.add(bubble)

    
}
