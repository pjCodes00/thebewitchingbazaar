
export default class FinalScene extends Phaser.Scene{
  constructor () {
    super({key: 'FinalScene'})
  }

  init(data) {
    this.selectedSpell= data.spell 
    console.log(`Final scene started for ${this.selectedSpell} spell`)
  }

  preload() {
    this.load.image('golden-bg', 'assets/golden-bg.jpg')
    this.load.image('back-btn', 'assets/backbutton.PNG')
    this.load.image('options-btn', 'assets/optionsbutton.PNG')
    this.load.image('speaker', 'assets/speaker.png')
    this.load.image('black-speaker', 'assets/black-speaker.png')
    this.load.image('sky-bg', 'assets/sky-bg.PNG')
   

    if(this.selectedSpell === 'Love') {
      this.load.image('red-jar-potion', 'assets/love-assets/red-jar-potion.png')
      this.load.image('love-spell-casted', 'assets/love-assets/love-spell-casted.PNG')
    }

    if(this.selectedSpell === 'Money') {
      this.load.image('money-jar-potion', 'assets/money-assets/money-jar-potion.PNG')
      this.load.image('money-spell-casted', 'assets/money-assets/money-spell-casted.PNG')
    }

    if(this.selectedSpell === 'Protection') {
      this.load.image('protection-jar-potion', 'assets/protection-assets/protection-jar-potion.PNG')
      this.load.image('protection-spell-casted', 'assets/protection-assets/protection-spell-casted.PNG')
    }

    if(this.selectedSpell === 'Hex') {
      this.load.image('hex-jar-potion', 'assets/hex-assets/hex-jar-potion.PNG')
      this.load.image('hex-spell-casted', 'assets/hex-assets/hex-spell-casted.PNG')
    }    

    
  }

  create() {
    console.log('final scene is running')

    this.wishAdded=false

    const width= this.cameras.main.width
    const height= this.cameras.main.height

    this.goldenBg= this.add.image(width / 2, height / 2, 'golden-bg').setOrigin(0.5, 0.5)

    const scaleX= width / this.goldenBg.width
    const scaleY= width / this.goldenBg.height
    const scale= Math.max(scaleX, scaleY)

    this.goldenBg.setScale(scale)
    this.goldenBg.setY(this.goldenBg.y - 400)
    this.goldenBg.setY(this.goldenBg.y + 400)

    this.centerX= this.cameras.main.width / 2
    this.centerY= this.cameras.main.height / 2

    const soundScene= this.scene.get('TheSoundScene')
    
    this.bgMusicWillow= soundScene.bgMusicWillow
    this.videoGamesBg= soundScene.videoGamesBg
    this.spellCast=soundScene.spellCast

    const speaker= this.add.image(width, 0, 'speaker').setOrigin(1, 0).setScale(0.06).setInteractive({useHandCursor: true})

  
    
    const tooltip= this.add.text(width - 80, 0, '', {
      font: '16px serif',
      fill: '#fff',
      backgroundColor: '#333',
      padding: {x:6, y:4},
      borderRadius: 4
    }).setDepth(50).setVisible(false).setOrigin(1, 0)


    this.currentMusic= this.bgMusicWillow
     
     speaker.on('pointerover', () => {
      speaker.setScale(0.07)

      if(this.currentMusic === this.bgMusicWillow) {
        tooltip.setText('Click to turn on/off music. Music: Taylor Swift-Willow instrumental')
      } else if (this.currentMusic === this.videoGamesBg) {
        tooltip.setText('Click to turn on/off music. Music: Lana Del Rey-Video Games')
      }
    
      tooltip.setVisible(true)
     })
  
     speaker.on('pointerout', () => {
      speaker.setScale(0.06)
      tooltip.setVisible(false)
     })
   
     speaker.on('pointerdown', () => {
       if(this.currentMusic && this.currentMusic.isPlaying) {
        this.currentMusic.pause()
        speaker.setTexture('black-speaker').setScale(0.06)
       } else if(this.currentMusic){
        this.currentMusic.resume()
        speaker.setTexture('speaker').setScale(0.06)
        
       }
     })

    const backBtn= this.add.image(0, 0, 'back-btn').setOrigin(1, 1).setPosition(this.scale.width, this.scale.height).setScale(0.1).setInteractive({useHandCursor:true})

    backBtn.on('pointerover', () => {
      backBtn.setScale(0.12)
      backBtn.setTint('0xe0b3ff')
    })
 
    backBtn.on('pointerout', () => {
     backBtn.setScale(0.1)
     backBtn.clearTint()
    })

    backBtn.on('pointerdown', () => {
      if(this.videoGamesBg.isPlaying) {
        this.videoGamesBg.stop()
      
      }

      if(!this.bgMusicWillow.isPlaying) {
        this.bgMusicWillow.play()
      }

     this.cameras.main.fadeOut(500, 0, 0, 0)

     this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene')
   })
    })

    
  const optionsBtn= this.add.image(0, 0, 'options-btn').setOrigin(0, 1).setScale(0.1).setInteractive({useHandCursor:true}).setPosition(0, this.scale.height)

  optionsBtn.on('pointerover', () => {
    optionsBtn.setScale(0.12)
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

  restartBtn.innerHTML= 'Restart Timer'

   optionsBtn.on('pointerdown', () => {
      optionsCont.style.display='flex'  
      blurOverlay.style.display='block'
      this.input.enabled= false
  
    })
  
    xBtn.addEventListener('click', () => {
      optionsCont.style.display='none'  
      blurOverlay.style.display='none'
      this.input.enabled= true
  
    })
  
    restartBtn.addEventListener('click', () => {
      
      this.scene.stop('GameScene')   

      if(this.videoGamesBg.isPlaying) {
        this.videoGamesBg.stop()
      }
   
      if(!this.bgMusicWillow.isPlaying) {
        this.bgMusicWillow.play()
      }

     this.scene.restart()
     this.wishAdded=false;
       optionsCont.style.display='none'  
      blurOverlay.style.display='none'
      this.input.enabled= true
    

    })
  
    startBtn.addEventListener('click', () => {
      this.scene.start('StartScene')
        optionsCont.style.display='none'  
      blurOverlay.style.display='none'
      this.input.enabled= true

      if(this.videoGamesBg.isPlaying) {
        this.videoGamesBg.stop()
      
      }

      if(!this.bgMusicWillow.isPlaying) {
        this.bgMusicWillow.play()
      }

  
    })
  
    

    let potionKey;
    let spellCastedKey;
    let message;

    switch(this.selectedSpell) {
      case 'Love':
        potionKey = 'red-jar-potion';
        spellCastedKey= 'love-spell-casted';
        message= 'Your spell is casted, love is in the air!'; 
        break;
      case 'Money' :
        potionKey = 'money-jar-potion';
        spellCastedKey= 'money-spell-casted';
        message= 'Your spell is casted, Money is on its way!'; 
        break;
      case 'Protection' :
        potionKey = 'protection-jar-potion';
        spellCastedKey= 'protection-spell-casted';
        message= 'Your spell is casted, Protection surrounds you!'; 
        break;
      case 'Hex':
        potionKey = 'hex-jar-potion';
        spellCastedKey= 'hex-spell-casted';
        message= 'Your spell is casted, The hex is on its way to them!'; 
        break;

    }

  this.potionImage=  this.add.image(this.centerX, this.centerY, potionKey).setOrigin(0.5, 0.5).setScale(0.3)

  this.tweens.add({
    targets: this.potionImage,
    y: this.centerY - 20,
    duration: 1000,
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
  })

    this.startTimer= 15

    this.timerText= this.add.text(10, 10, this.formatTime(this.startTimer), {
      fontSize: '40px',
      fill: '#fff',
      fontFamily: 'Arial'
    }).setOrigin(0, 0).setVisible(true)


    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })

    this.finalMessage= message
    this.finalImage= spellCastedKey


   this.waitMsg= this.add.text(this.centerX, this.centerY + 200, 'Wait...' , {
      fontSize: '40px',
      fill:'golden'
    }).setOrigin(0.5, 0.5).setVisible(true)


    
    this.makeImageWander= (floatImages) => {
      const newX= floatImages.x + Phaser.Math.Between(-100, 100)
      const newY= floatImages.y + Phaser.Math.Between(-100, 100)

      this.tweens.add({
        targets: floatImages,
        x: newX,
        y: newY,
        duration: Phaser.Math.Between(1000, 3000),
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.makeImageWander(floatImages)
        }
      })
     }

     this.makeImageTwinkle= (floatImages) => {
      this.tweens.add({
        targets: floatImages,
        alpha: {from: floatImages.alpha, to: 0},
        duration: Phaser.Math.Between(2000, 4000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000),
        ease: 'Sine.easeInOut'

      })
     }    
  
  }

  updateTimer() {
    if(this.startTimer > 0) {
      this.startTimer --
      this.timerText.setText(this.formatTime(this.startTimer)).setVisible(true)

      if(this.waitMsg) {
        this.waitMsg.setVisible(true)
      }
    
    } else {
      this.timerText.setVisible(false)

     

       if(!this.wishAdded) {
        this.wishAdded= true

        this.goldenBg.setTexture('sky-bg')

        if(this.bgMusicWillow.isPlaying) {
          this.bgMusicWillow.stop()
        }

         this.spellCast.play()
        this.videoGamesBg.play()
        this.currentMusic= this.videoGamesBg

        if(this.waitMsg) {
          this.waitMsg.setVisible(false)
        }

      this.finalSpellImage=  this.add.image(this.centerX, this.centerY, this.finalImage).setOrigin(0.5, 0.5).setScale(0.3)

       this.tweens.add({
        targets: this.finalSpellImage,
        yoyo: true,
        y: this.centerY - 20,
        repeat: -1,
        duration: 1000,
        ease: 'Sine.easeInOut'

      })

       this.add.text(this.centerX, this.centerY + 200, this.finalMessage, {
         fontSize: '40px',
         fill:'#FFD700'
       }).setOrigin(0.5, 0.5)
       }

       this.potionImage.setVisible(false)

    

       this.floatingImages= this.add.group()

       for(let i=0; i < 10; i++) {
        const width= this.cameras.main.width
        const height= this.cameras.main.height

        const x= Phaser.Math.Between(0, width)
        const y= Phaser.Math.Between(0, height)

        const floatImages=  this.add.image(x, y, this.finalImage).setOrigin(0.5, 0.5).setScale(Phaser.Math.FloatBetween(0.01, 0.05)).setAlpha(Phaser.Math.FloatBetween(0.5, 1))

        this.floatingImages.add(floatImages)

        this.makeImageWander(floatImages)
        this.makeImageTwinkle(floatImages)
       }

      
    }
  } 

  formatTime(seconds) {
  
    const secondsRemaining= seconds % 60

    return `Timer: ${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}s`
  }
}



