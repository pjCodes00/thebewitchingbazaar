export default class TheSoundScene extends Phaser.Scene{
  constructor() {
    super({key: 'TheSoundScene'})
  }

  preload() {
    const loadingText= this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading... Please wait for a few minutes.', {
      fontSize: '40px',
      fill: 'gold'
    }).setOrigin(0.5)

    this.load.audio('bg-music1', 'assets/music/willow-instrumental.mp3')
    this.load.audio('bg-music2', 'assets/music/river-music.wav')
    this.load.audio('hover-sound1', 'assets/music/fairy-sound.wav')
    this.load.audio('pick-ingredient', 'assets/music/pick-ingredient.wav')
    this.load.audio('drop-ingredient', 'assets/music/drop-ingredient.wav')
    this.load.audio('drop-water', 'assets/music/drop-water.wav')
    this.load.audio('brewing-button', 'assets/music/brewing-button.wav')
    this.load.audio('brewing', 'assets/music/brewsound.wav')
    this.load.audio('heart-button', 'assets/music/heart-button.wav')
    this.load.audio('completed-button', 'assets/music/completed-button.wav')
    this.load.audio('mix-ingredients', 'assets/music/mix-ingredients.wav')
    this.load.audio('video-games', 'assets/music/video-games.mp3')
    this.load.audio('moon-water', 'assets/music/waterdrop.wav')
    this.load.audio('spell-cast', 'assets/music/spellcast.wav')

    this.load.on('complete', () => {
      loadingText.destroy()
    })
  }

  create () { 
    console.log('sound scene running')
    if(!this.bgMusicWillow) {
      this.bgMusicWillow= this.sound.add('bg-music1', {
        loop: true,
        volume: 0.5
      })

      this.bgMusicWillow.play()
    }

    const centerX= this.cameras.main.width / 2
    const centerY= this.cameras.main.height / 2

    this.add.text(centerX, centerY, 'Loading... Please wait for a few minutes.', {
      fontSize: '40px',
      fill: 'gold'
    }).setOrigin(0.5, 0.5)


    

    this.fairyHoverSound= this.sound.add('hover-sound1', {
      volume: 0.5
    })

    this.bgMusicRiver= this.sound.add('bg-music2', {
      volume: 0.3,
      loop: true
    })

    this.pickIngredient= this.sound.add('pick-ingredient', {
      volume: 0.5
    })

    this.dropIngredient= this.sound.add('drop-ingredient', {
      volume: 0.5
    })

    this.moonWater= this.sound.add('moon-water', {
      volume: 0.5
    })

    this.dropWater= this.sound.add('drop-water', {
      volume: 0.5
    })

    this.mixIngredients= this.sound.add('mix-ingredients', {
      volume: 0.5
    })

    this.brewingButton= this.sound.add('brewing-button', {
      volume: 0.5
    })

    this.brewing=this.sound.add('brewing', {
      voulume:0.5,
      loop: true
    })

    
    this.heartButton= this.sound.add('heart-button', {
      volume: 0.5
    })

    
    this.completedButton= this.sound.add('completed-button', {
      volume: 0.5
    })

    this.spellCast= this.sound.add('spell-cast', {
      volume:0.4
    })

    this.videoGamesBg= this.sound.add('video-games', {
      volume:0.5,
      loop: true
    })
   

    this.time.delayedCall(1000, () => {
    
      this.scene.start('StartScene')


    })


   
  }
}