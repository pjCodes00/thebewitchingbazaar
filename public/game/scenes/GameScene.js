import { setupLoveSpell }from "./spells/LoveSpell.js"
import  {setupMoneySpell} from "./spells/MoneySpell.js"
import  {setupProtectionSpell} from "./spells/ProtectionSpell.js"
import  {setupHexSpell} from "./spells/HexSpell.js"
import { toggleDomBtns, handleVisibility } from "./spells/common.js"
import {createTooltip, tooltipOnIngredients} from './common.js'


export default class GameScene extends Phaser.Scene{
  constructor() {
    super({key: 'GameScene'})
  }

  init(data) {
    this.selectedSpell= data.spell 

    console.log(`Game started with spell: ${this.selectedSpell}`)
  }

  preload() {
    const loadingText= this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', {
      fontSize: '40px',
      fill: 'gold'
    }).setOrigin(0.5)

    this.load.image('table-bg', 'assets/wood-bg.jpg')
    this.load.image('black-cauldron-2', 'assets/black-cauldron-2.png')
    this.load.image('spoon', 'assets/woodenspoon.PNG')
    this.load.image('manifest-paper', 'assets/paper.PNG')
    this.load.image('instruction-paper', 'assets/instruction-paper.PNG')
    this.load.image('empty-jar', 'assets/emptyjar1.PNG')
    this.load.image('candle-1', 'assets/candle-1.PNG')
    this.load.image('speaker', 'assets/speaker.png')
    this.load.image('white-heart', 'assets/white-heart.png') 
    this.load.image('scroll', 'assets/scroll.PNG')
    this.load.image('black-speaker', 'assets/black-speaker.png')
    this.load.image('back-btn', 'assets/backbutton.PNG')
    this.load.image('options-btn', 'assets/optionsbutton.PNG')
    this.load.image('candle-flame', 'assets/candleFlame.PNG')
    this.load.image('spark', 'assets/goldenbubble.PNG')


    if(this.selectedSpell === 'Love') {
    this.load.image('cinnamon-jar', 'assets/love-assets/cinnamonjarcrop.PNG')
    this.load.image('pink-salt-jar', 'assets/love-assets/pinksaltjar.PNG')
    this.load.image('moon-water-jar', 'assets/moonwaterjar.PNG')
    this.load.image('rose-petals-jar', 'assets/love-assets/rosepetaljar.PNG')
    this.load.image('rose-petal-ingredient', 'assets/love-assets/rose-petal-particles.png')
    this.load.image('moon-drop-ingredient', 'assets/moon-drop.PNG')
    this.load.image('cinnamon-stick-ingredient', 'assets/love-assets/cinnamon-stick.PNG')
    this.load.image('pink-salt-ingredient', 'assets/love-assets/pink-salt-particles.png')
    this.load.image('moon-water-ingredient-1', 'assets/moon-water-cauldron-1.PNG')
    this.load.image('moon-water-ingredient-2', 'assets/moon-water-cauldron-2.PNG')
    this.load.image('red-water-ingredient', 'assets/red-water-cauldron.PNG')
    this.load.image('red-potion', 'assets/love-assets/redpotion.PNG')
    this.load.image('red-drop', 'assets/love-assets/red-drop.png')
    this.load.image('red-heart', 'assets/love-assets/red-heart.png')
    this.load.image('red-bubble', 'assets/love-assets/redbubble.PNG')
    this.load.image('red-water', 'assets/love-assets/redwater.PNG')

    this.load.spritesheet('stirring-animation-love', 'assets/love-assets/SPRITESHEET1.1.png', {
      frameWidth: 1000,
      frameHeight: 1000,
      endFrame: 4
    })
  }

  if(this.selectedSpell === 'Money') {
    this.load.image('green-aventurine-jar', 'assets/money-assets/greenaventurinejar.PNG')
    this.load.image('bay-leaves-jar', 'assets/money-assets/bayleafjar.PNG')
    this.load.image('cinnamon-jar', 'assets/money-assets/cinnamonjarcrop.PNG')
    this.load.image('green-aventurine-ingredient', 'assets/money-assets/green-aventurine-ingredient.PNG')
    this.load.image('bay-leaf-ingredient', 'assets/money-assets/bayleaves.PNG')
    this.load.image('cinnamon-stick-ingredient', 'assets/money-assets/cinnamon-stick.PNG')
    this.load.image('moon-water-jar', 'assets/moonwaterjar.PNG')
    this.load.image('moon-drop-ingredient', 'assets/moon-drop.PNG')
    this.load.image('moon-water-ingredient-1', 'assets/moon-water-cauldron-1.png')
    this.load.image('green-potion', 'assets/money-assets/green-potion.PNG')
    this.load.image('green-drop', 'assets/money-assets/green-drop.png')
    this.load.image('green-heart', 'assets/money-assets/green-heart.PNG')
    this.load.image('green-bubble', 'assets/money-assets/greenbubble.PNG')
    this.load.image('green-water', 'assets/money-assets/greenwater.PNG')

    this.load.spritesheet('stirring-animation-money', 'assets/money-assets/SPRITESHEET2.2.png', {
      frameWidth: 1000,
      frameHeight: 1000,
      endFrame: 4
    })

  }

  if(this.selectedSpell === 'Protection') {
    this.load.image('salt-jar', 'assets/protection-assets/salt-jar.PNG')
    this.load.image('rosemary-jar', 'assets/protection-assets/rosemaryjar.PNG')
    this.load.image('cloves-jar', 'assets/protection-assets/clovesjar.PNG')
    this.load.image('salt-ingredient', 'assets/protection-assets/salt-ingredient.PNG')
    this.load.image('rosemary-ingredient', 'assets/protection-assets/rosemary-ingredient.PNG')
    this.load.image('cloves-ingredient', 'assets/protection-assets/cloves-ingredient.PNG')
    this.load.image('moon-water-jar', 'assets/moonwaterjar.PNG')
    this.load.image('moon-drop-ingredient', 'assets/moon-drop.PNG')
    this.load.image('moon-water-ingredient-1', 'assets/moon-water-cauldron-1.png')
    this.load.image('white-potion', 'assets/protection-assets/white-potion.PNG')
    this.load.image('white-drop', 'assets/protection-assets/white-drop.PNG')
    this.load.image('pink-heart', 'assets/protection-assets/pink-heart.png')
    this.load.image('pink-bubble', 'assets/protection-assets/pinkbubble.PNG')
    this.load.image('pink-water', 'assets/protection-assets/pinkwater.PNG')

    this.load.spritesheet('stirring-animation-protection', 'assets/protection-assets/SPRITESHEET3.png', {
      frameWidth: 1000,
      frameHeight: 1000,
      endFrame: 4
    })

  }

  if(this.selectedSpell === 'Hex') {
    this.load.image('rotten-lemons-jar', 'assets/hex-assets/rottenlemonsjar.PNG')
    this.load.image('chilli-flakes-jar', 'assets/hex-assets/chilliflakesjar.PNG')
    this.load.image('rusted-nails-jar', 'assets/hex-assets/rustednailsjar.PNG')
    this.load.image('rotten-lemon-ingredient', 'assets/hex-assets/rotten-lemon-ingredient.PNG')
    this.load.image('chilli-flakes-ingredient', 'assets/hex-assets/chilli-flakes-ingredient.PNG')
    this.load.image('rusted-nail-ingredient', 'assets/hex-assets/rusted-nail-ingredient.PNG')
    this.load.image('mud-water-jar', 'assets/hex-assets/mud-water-jar.PNG')
    this.load.image('mud-drop-ingredient', 'assets/hex-assets/mud-drop-ingredient.PNG')
    this.load.image('mud-water-ingredient1', 'assets/hex-assets/mud-water-ingredient1.PNG')
    this.load.image('black-potion', 'assets/hex-assets/black-potion.PNG')
    this.load.image('black-drop', 'assets/hex-assets/black-drop.PNG')
    this.load.image('black-heart', 'assets/hex-assets/black-heart.png')
    this.load.image('black-bubble', 'assets/hex-assets/purplebubble.PNG')
    this.load.image('black-water', 'assets/hex-assets/blackwater1.PNG')

    this.load.spritesheet('stirring-animation-hex', 'assets/hex-assets/SPRITESHEET4.png', {
      frameWidth: 1000,
      frameHeight: 1000,
      endFrame: 4
    })

  }

  this.load.on('complete', () => {
      loadingText.destroy()
    })

  }

  create() {
   

    const soundScene= this.scene.get('TheSoundScene')
    this.bgMusicWillow= soundScene.bgMusicWillow
    this.fairyHoverSound= soundScene.fairyHoverSound
    this.bgMusicRiver= soundScene.bgMusicRiver
    this.pickIngredient= soundScene.pickIngredient
    this.dropIngredient= soundScene.dropIngredient
    this.dropWater= soundScene.dropWater 
    this.mixIngredients= soundScene.mixIngredients 
    this.brewingButton= soundScene.brewingButton 
    this.heartButton= soundScene.heartButton 
    this.completedButton= soundScene.completedButton
    this.brewing= soundScene.brewing
    this.moonWater= soundScene.moonWater

   if(this.bgMusicRiver.isPlaying) {
    this.bgMusicRiver.stop()
   }
 
   

    const width= this.cameras.main.width 
    const height= this.cameras.main.height

    const bg= this.add.image(width / 2, height / 2, 'table-bg').setOrigin(0.5, 0.5)
    
    const scaleX= width / bg.width
    const scaleY= height / bg.height
    const scale= Math.max(scaleX, scaleY)

    bg.setScale(scale)
    bg.setY(bg.y - 190)

    const centerX= this.cameras.main.width / 2
    const centerY= this.cameras.main.height / 2

    const speaker= this.add.image(width - 80, 0, 'speaker').setOrigin(1, 0).setScale(0.06).setInteractive({useHandCursor:true}).setDepth(50)

    const tooltip= this.add.text(width - 80, 0, '', {
      font: '16px serif',
      fill: '#fff',
      backgroundColor: '#333',
      padding: {x:6, y:4},
      borderRadius: 4
    }).setDepth(50).setVisible(false).setOrigin(1, 0)

  speaker.on('pointerover', () => {
   speaker.setScale(0.07)
   tooltip.setText('Click to turn on/off music. Music: Taylor Swift-Willow instrumental')
   tooltip.setVisible(true)
  })

  speaker.on('pointerout', () => {
   speaker.setScale(0.06)
   tooltip.setVisible(false)
  })

  speaker.on('pointerdown', () => {
   if(this.bgMusicWillow.isPlaying) {
    this.bgMusicWillow.pause()
    speaker.setTexture('black-speaker').setScale(0.06)
   } else {
    this.bgMusicWillow.resume()
    speaker.setTexture('speaker').setScale(0.06)
    
   }
 })


     let spellIngredients=[]
   
  const cauldron= this.add.image(centerX - 300, centerY + 100, 'black-cauldron-2').setScale(0.5).setInteractive()
      
   const candle= this.add.image(100, 150, 'candle-1').setScale(0.13).setOrigin(0, 0)  
   const candleFlame= this.add.image(156, 155, 'candle-flame').setScale(0.1) .setOrigin(0, 0).setTint(0xFFCC00)

   this.tweens.add({
    targets: candleFlame,
    y:{from:candleFlame.y - 1, to: candleFlame.y + 1},
    alpha:{from:0.8, to:1},
    scale:{from:0.09, to:0.1},
    yoyo:true,
    repeat:-1,
    duration: Phaser.Math.Between(700, 1000),
    ease: 'Sine.easeInOut',

   })

 

   const backBtn= this.add.image(width, 0, 'back-btn').setOrigin(1, 0).setScale(0.1).setInteractive({useHandCursor:true})

   backBtn.on('pointerover', () => {
     backBtn.setScale(0.105)
     backBtn.setTint('0xe0b3ff')
   })

   backBtn.on('pointerout', () => {
    backBtn.setScale(0.1)
    backBtn.clearTint()
   })

   backBtn.on('pointerdown', () => {
         this.cameras.main.fadeOut(500, 0, 0, 0)
     
         this.cameras.main.once('camerafadeoutcomplete', () => {
           this.scene.stop('GameScene')
           this.scene.start('MenuScene')
         })
        })

  const optionsBtn= this.add.image(0, 0, 'options-btn').setOrigin(0, 1).setScale(0.1).setInteractive({useHandCursor:true}).setPosition(0, this.scale.height)

  optionsBtn.on('pointerover', () => {
    optionsBtn.setScale(0.105)
    optionsBtn.setTint('0xe0b3ff')
  })

  optionsBtn.on('pointerout', () => {
   optionsBtn.setScale(0.1)
   optionsBtn.clearTint()
  })


  const optionsCont= document.querySelector('.options-cont')
  const blurOverlay= document.getElementById('blur-overlay')
  const xBtn= optionsCont.querySelector('.fa-rectangle-xmark')
  const restartBtn= optionsCont.querySelector('.restart-btn')
  const startBtn= optionsCont.querySelector('.start-btn')
  const errMsgCont= document.querySelector('.err-msg-cont')
  const extractionMsgCont= document.querySelector('.extraction-msg-cont')

  if (!optionsCont || !blurOverlay || !xBtn || !restartBtn || !startBtn) {
    console.warn('Missing one or more DOM elements required for options menu.');
    return;
  }

  restartBtn.innerHTML= 'Restart Spell'
       
  optionsBtn.on('pointerdown', () => {
    if (!optionsCont || !blurOverlay || !xBtn || !restartBtn || !startBtn) {
      console.warn('Missing one or more DOM elements for options menu.')
      return;
    }

    optionsCont.style.display='flex'  
    blurOverlay.style.display='block'
    blurOverlay.style.zIndex='210'
    this.input.enabled= false
    toggleDomBtns(false)

  })

  xBtn.addEventListener('click', () => {
    if (!optionsCont || !blurOverlay || !xBtn || !restartBtn || !startBtn) {
      console.warn('Missing one or more DOM elements for options menu.')
      return;
    }

    optionsCont.style.display='none'  
    blurOverlay.style.display='none'
    blurOverlay.style.zIndex='100'
    this.input.enabled= true
    toggleDomBtns(true)
    handleVisibility(this)

  })

  restartBtn.addEventListener('click', () => {
    if (!optionsCont || !blurOverlay || !xBtn || !restartBtn || !startBtn) {
      console.warn('Missing one or more DOM elements for options menu.')
      return;
    }

    this.scene.stop('FinalScene')

   this.scene.restart()
     optionsCont.style.display='none'  
    blurOverlay.style.display='none'
    blurOverlay.style.zIndex='100'
    errMsgCont.style.display='none'
    extractionMsgCont.style.display='none'
    this.input.enabled= true
    toggleDomBtns(true)

  })

  startBtn.addEventListener('click', () => {
    if (!optionsCont || !blurOverlay || !xBtn || !restartBtn || !startBtn) {
      console.warn('Missing one or more DOM elements for options menu.')
      return;
    }

    this.scene.start('StartScene')
      optionsCont.style.display='none'  
    blurOverlay.style.display='none'
    blurOverlay.style.zIndex='100'
    this.input.enabled= true
    toggleDomBtns(true)

  })

  const tooltipIngredient= tooltipOnIngredients(this)

 
  
    if(this.selectedSpell === 'Love') {
      setupLoveSpell(this, {spellIngredients, cauldron, candle, centerX, centerY, backBtn, tooltipIngredient })
    }

    if(this.selectedSpell === 'Money') {
      setupMoneySpell(this, {spellIngredients, cauldron, candle, centerX, centerY, backBtn, tooltipIngredient})
    }

    if(this.selectedSpell === 'Protection') {
      setupProtectionSpell(this, {spellIngredients, cauldron, candle, centerX, centerY, backBtn, tooltipIngredient})
    }

    if(this.selectedSpell === 'Hex') {
      setupHexSpell(this, {spellIngredients, cauldron, candle, centerX, centerY, backBtn, tooltipIngredient})
    }

  

    
    }
  }     
  
  

  