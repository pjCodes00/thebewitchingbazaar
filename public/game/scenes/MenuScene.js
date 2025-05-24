import {createTooltip} from './common.js'

export default class MenuScene extends Phaser.Scene{
  constructor() {
    super({key: 'MenuScene'})
  }

  preload() {
    this.load.image('forest-bg', 'assets/forest-background.jpg')
    this.load.image('heading-banner', 'assets/choose-spell.PNG')
    this.load.image('love-jar', 'assets/love-jar2.PNG')
    this.load.image('money-jar', 'assets/money-jar2.PNG')
    this.load.image('protection-jar', 'assets/protection-jar2.PNG')
    this.load.image('hex-jar', 'assets/hex-jar2.PNG')
    this.load.image('love-banner', 'assets/love-banner1.PNG')
    this.load.image('hex-banner', 'assets/hex-banner1.PNG') 
    this.load.image('protection-banner', 'assets/protection-banner1.PNG')
    this.load.image('money-banner', 'assets/money-banner1.PNG')
    this.load.image('speaker', 'assets/speaker.png')
    this.load.image('black-speaker', 'assets/black-speaker.png')
    this.load.image('blue-bubble', 'assets/bluebubble.PNG')
    this.load.image('back-btn', 'assets/backbutton.PNG')

 
  }

  create() {
  
    console.log('menuscene is running')

    const width= this.cameras.main.width
    const height= this.cameras.main.height

   const bg= this.add.image(width / 2, height / 2, 'forest-bg').setOrigin(0.5, 0.5)

    const scaleX= width / bg.width
    const scaleY= height / bg.height
    const scale= Math.max(scaleX, scaleY)
    
    bg.setScale(scale)

    bg.setY(bg.y - 150)


    const centerX= this.cameras.main.width / 2
    const centerY= this.cameras.main.height / 2

    this.add.image(centerX, centerY - 150, 'heading-banner').setOrigin(0.5, 0.5).setScale(0.3)

    
    const soundScene= this.scene.get('TheSoundScene')

    
    this.bgMusicWillow= soundScene.bgMusicWillow

   this.fairyHoverSound= soundScene.fairyHoverSound
    this.bgMusicRiver= soundScene.bgMusicRiver


    this.bgMusicRiver.play()
 
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
       this.bgMusicRiver.pause()
       speaker.setTexture('black-speaker').setScale(0.06)
       
      } else {
       this.bgMusicWillow.resume()
       this.bgMusicRiver.resume()
       speaker.setTexture('speaker').setScale(0.06)
      }
    })

  
    

    const spells= [{
      game: 'Love',
      banner: 'love-banner',
      jar: 'love-jar',
      x: centerX - 300
    }, {
      game: 'Money',
      banner: 'money-banner',
      jar: 'money-jar',
      x: centerX - 80
      
    }, {

      game: 'Protection',
      banner: 'protection-banner',
      jar: 'protection-jar',
      x: centerX + 140 
    }, {
      game: 'Hex',
      banner: 'hex-banner',
      jar: 'hex-jar',
      x: centerX + 360
    }]

    
    spells.forEach((spell) => {

    this.add.image(spell.x, centerY + 90, spell.jar).setOrigin(0.5, 0.5).setScale(0.1)

    const  spellBanner= this.add.image(spell.x, centerY + 220, spell.banner).setOrigin(0.5, 0.5).setScale(0.1).setInteractive({useHandCursor: true})
     
        spellBanner.on('pointerdown', () => {
          console.log(`Starting ${spell.game} game`);
          this.scene.start('GameScene', {spell: spell.game})
      
        })

        spellBanner.on('pointerover', () => {
          this.fairyHoverSound.play()
          spellBanner.setScale(0.12)

          const glowColor = { value: 0xFF9933 };

          spellBanner.flickerTween = this.tweens.add({
            targets: glowColor,
            value: 0xFFD700, 
            duration: 1000,
            yoyo: true,
            repeat: -1,
            onUpdate: () => {
              spellBanner.setTint(glowColor.value);
            }
          });
        });  
        
        spellBanner.on('pointerout', () => {
          spellBanner.clearTint();
          spellBanner.setScale(0.1)

          if (spellBanner.flickerTween) {
            spellBanner.flickerTween.stop();
            spellBanner.flickerTween = null;
          }
        });
      
    })

    this.makeDotWander= (dot) => {
      const newX= dot.x + Phaser.Math.Between(-100, 100)
      const newY= dot.y + Phaser.Math.Between(-100, 100)

      this.tweens.add({
        targets: dot,
        x: newX,
        y: newY,
        duration: Phaser.Math.Between(1000, 3000),
        ease: 'Sine.easeInOut',
        onComplete: () => {
          this.makeDotWander(dot)
        }
       
      })
    }

    this.makeDotTwinkle= (dot) => {
      this.tweens.add({
        targets:dot,
        alpha: {from: dot.alpha, to:0},
        duration: Phaser.Math.Between(2000, 4000),
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Phaser.Math.Between(0, 3000)
      })
    }


    this.goldenDots= this.add.group()

    for(let i = 0; i < 30; i++) {
      const x= Phaser.Math.Between(0, width)
      const y= Phaser.Math.Between(0, height)

      const dot= this.add.image(x, y, 'blue-bubble')
        .setScale(Phaser.Math.FloatBetween(0.01, 0.03))
        .setAlpha(Phaser.Math.FloatBetween(0.5, 1))
        .setTint(0x66ccff);

      this.goldenDots.add(dot)

      this.makeDotWander(dot)
      this.makeDotTwinkle(dot)

    }

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
      this.cameras.main.fadeOut(500, 0, 0, 0); // black fade

      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('StartScene');
      });
     })
  }
}

