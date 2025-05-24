
import StartScene from './scenes/StartScene.js'
import MenuScene from './scenes/MenuScene.js'
import GameScene from './scenes/GameScene.js'
import FinalScene from './scenes/FinalScene.js'
import TheSoundScene from './scenes/TheSoundScene.js'

const config= {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  scene: [TheSoundScene, StartScene, MenuScene, GameScene, FinalScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter:Phaser.Scale.CENTER_BOTH

  },
  physics:{
    default: 'arcade',
    arcade: {
      gravity:{x:0, y:0},
      debug: true
    }


  },
  dom: {createContainer: true}
}

const game= new Phaser.Game(config)


