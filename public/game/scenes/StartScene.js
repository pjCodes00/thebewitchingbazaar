import {createTooltip} from './common.js'

export default class StartScene extends Phaser.Scene{
  constructor() {
    super({key: 'StartScene'})
  }

  preload() {
    const loadingText= this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', {
      fontSize: '40px',
      fill: 'gold'
    }).setOrigin(0.5)

      this.load.image('black-cauldron', 'assets/black-cauldron0.png')
      this.load.image('purple-smoke-1', 'assets/purple-smoke-1.png')
      this.load.image('purple-smoke-2', 'assets/purple-smoke-2.png')
      this.load.image('purple-smoke-5', 'assets/purple-smoke-5.png')
      this.load.image('purple-smoke-6', 'assets/purple-smoke-6.png')
      this.load.image('pink-smoke-2', 'assets/pink-smoke-2.png')
      this.load.image('witch', 'assets/witch-1.png')
      this.load.image('purple-sparkle', 'assets/purple-dot-1.png')
      this.load.image('purple-glitter', 'assets/purple-dot-2.png')
      this.load.image('fire-sticks-1', 'assets/fire-sticks-1.png')
      this.load.image('fire-flame-1', 'assets/fire-flame-1.png')
      this.load.image('fire-flame-2', 'assets/fire-flame-2.png')
      this.load.image('start-board-1', 'assets/golden-board1.png')
      this.load.image('speaker', 'assets/golden-speaker.png')
      this.load.image('black-speaker', 'assets/black-speaker.png')
      this.load.image('purple-moon', 'assets/golden-moon.png')
      this.load.image('flying-witch', 'assets/flying-witch.PNG')
      this.load.image('back-btn', 'assets/backbutton.PNG')

      this.load.on('complete', () => {
      loadingText.destroy()
    })
  }

  create() {
    console.log("StartScene is running!");

    this.input.once('pointerdown', () => {
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }
    });
  

    const width= this.cameras.main.width
    const height= this.cameras.main.height

    const redMoonBg= this.add.image( width / 2, height / 2, 'purple-moon').setOrigin(0.5, 0.5)

    const scaleX= width / redMoonBg.width
    const scaleY= height / redMoonBg.height
    const scale= Math.max(scaleX, scaleY)

    redMoonBg.setScale(scale)
   redMoonBg.setY(redMoonBg.y - 220)



  const soundScene= this.scene.get('TheSoundScene')
  this.bgMusicWillow= soundScene.bgMusicWillow

  
   const speaker= this.add.image(10, 10, 'speaker').setOrigin(0, 0).setScale(0.06).setInteractive({useHandCursor: true})

  
  const tooltip= createTooltip(this) 
   
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


    const centerX= this.cameras.main.width/2
    const centerY= this.cameras.main.height/2

   

    this.add.image(centerX + 400, centerY+130, 'black-cauldron').setOrigin(0.5, 0.5).setScale(0.3).setDepth(1)
    this.add.image(centerX + 400, centerY+260, 'fire-sticks-1').setOrigin(0.5, 0.5).setScale(0.08)
   const startBoard=  this.add.image(centerX-400, centerY+150, 'start-board-1').setOrigin(0.5, 0.5).setScale(0.3).setInteractive({useHandCursor: true})


   this.fairyHoverSound= soundScene.fairyHoverSound

    const witchWidth= 200
    const startX= this.cameras.main.width + witchWidth / 2
    const endX= -witchWidth / 2

   const flyingWitch =this.add.image(startX, centerY - 100, 'flying-witch').setOrigin(0.5, 0.5).setScale(0.26)

   this.tweens.add({
    targets: flyingWitch,
    x: endX - 100,
    duration: 6000,
    repeat: -1,
    ease: 'Linear',
    onRepeat: () => {
      flyingWitch.x = startX + 100
    }
   })

    startBoard.on('pointerover', () => {
      this.fairyHoverSound.play()

      startBoard.setTint(0xE6BE8A)
      startBoard.setScale(0.35)
       
    })

    startBoard.on('pointerout', () => {
      startBoard.clearTint()
      startBoard.setScale(0.3)

    })



    startBoard.on('pointerdown', () => {
      this.scene.start('MenuScene')
    
    })

    

   

      const purpleSmoke= this.add.particles(centerX + 400, centerY + 7, 'purple-smoke-2', {
       speedX: {min: -50, max: 70 },
        speedY: {min: -200, max: -100},
        scale: {start: 0.1, end: 0.2},
        lifespan:{start: 3000, end: 5000},
        alpha:{start: 0.9, end: 0},
        gravityY: -30,
        frequency: 900,
        quantity: 3,
        tint:  0xFFD700
    
    
        }).setDepth(2)

        const purpleSmoke1= this.add.particles(centerX + 410, centerY + 6, 'purple-smoke-2', {
           speedX: {min: -60, max: 50 },
            speedY: {min: -50, max: -50},
            scale: {start: 0.1, end: 0.2},
            lifespan:{start: 3000, end: 5000},
            alpha:{start: 0.9, end: 0},
            gravityY: -30,
            frequency: 1500,
            quantity: 2,
           tint: 0xFF66CC
        
        
            }).setDepth(2)
  

            const purpleSmoke2= this.add.particles(centerX + 430, centerY + 6, 'purple-smoke-2', {
              
               speedX: {min: -40, max: 40 },
                speedY: {min: -40, max: -40},
                scale: {start: 0.1, end: 0.2},
                lifespan:{start: 3000, end: 5000},
                alpha:{start: 0.9, end: 0},
                gravityY: -30,
                frequency: 1700,
                quantity: 1,
               blendMode: 'ADD',
               tint:  0xFFD700
    
              
            
            
                }).setDepth(2)

                const purpleSmoke3= this.add.particles(centerX + 390, centerY + 6, 'purple-smoke-2', {
          
                   speedX: {min: -40, max: 40 },
                    speedY: {min: -40, max: -40},
                    scale: {start: 0.1, end: 0.2},
                    lifespan:{start: 3000, end: 5000},
                    alpha:{start: 0.9, end: 0},
                    gravityY: -30,
                    frequency: 1700,
                    quantity: 1,
                   blendMode: 'ADD',
                   tint:  0xFFD700

                
                    }).setDepth(2)
          
      

      const fireFlame1= this.add.particles(centerX+ 400, centerY+240, 'fire-flame-1', {
        speedX: {min: -10, max: 10 },
        speedY: {min: -60, max: -20},
        scale: {start: 0.05, end: 0.1},
        lifespan:{start: 500, end: 1200},
        alpha:{start: 1, end: 0},
        frequency: 500,
        quantity: 3,
        blendMode: 'ADD',
        tint: 0xffaa33,
        accelerationX: { min: -5, max: 5 } ,
        
    
    
      })

      const fireFlame2= this.add.particles(centerX + 395, centerY+250, 'fire-flame-2', {
        speedX: {min: -20, max: 20 },
        speedY: {min: -60, max: -20},
        scale: {start: 0.05, end: 0.1},
        lifespan:{start: 500, end: 1200},
        alpha:{start: 1, end: 0},
        frequency: 200,
        quantity: 3,
        blendMode: 'ADD',
        tint: 0xffaa33,
        accelerationX: { min: -5, max: 5 } 
    
    
      })

      const fireFlame3= this.add.particles(centerX+ 410, centerY+240, 'fire-flame-2', {
        speedX: {min: -20, max: 20 },
        speedY: {min: -60, max: -20},
        scale: {start: 0.05, end: 0.1},
        lifespan:{start: 500, end: 1200},
        alpha:{start: 1, end: 0},
      //  gravityY: -100,
        frequency: 200,
        quantity: 1,
        blendMode: 'ADD',
        tint: 0xffaa33,
        accelerationX: { min: -5, max: 5 } 
    
    
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
            window.location.href='/index'
        })  
      })
        
  }
}


