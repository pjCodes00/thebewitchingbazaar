import { handleOkBtn, handleOkPotionBtn, handleWishMsg, handleStepMsg, handleSpoonMsg, handleBrewMsg, handleCompleteMsg, handleExtractionMsg, handleHeartsMsg, handleIngredientMsg, spawnBubble } from "./common.js";

export function setupMoneySpell(scene, {spellIngredients, cauldron, centerX, centerY, tooltipIngredient}) {

  scene.input.setDefaultCursor('default'); 
  
  
  handleOkBtn(scene)
 handleOkPotionBtn(scene)

  let scroll;
  let moonWaterIngredient1;


  const spellWork= [
      
    {
      jar:'cinnamon-jar',
      ingredient:'cinnamon-stick-ingredient',
      x: centerX, 
      y: centerY + 200, 
      scale: 0.26,
      name: 'Cinnamon'
    },
    {
      jar:'green-aventurine-jar',
      ingredient:'green-aventurine-ingredient',
      x:centerX - 120,
      y: centerY - 170,
      scale: 0.22,
      name: 'Green Aventurine'
    },
    {
      jar:'bay-leaves-jar',
      ingredient:'bay-leaf-ingredient',
      x: centerX - 320,
      y: centerY - 190,
      scale: 0.22,
      name: 'Bay Leaves'
    },
    {
      jar:'moon-water-jar',
      ingredient:'moon-drop-ingredient',
      x: centerX + 10,
      y: centerY + 50,
      scale: 0.2,
      name: 'Moon Water'
    },
  
]

  const openRadius = cauldron.displayWidth * 0.2;
  const openY = cauldron.y - (cauldron.displayHeight * 0.01);

  const cauldronOpenCircle = new Phaser.Geom.Circle(
    cauldron.x + 10,
    openY + 20,
    openRadius
  );

  
  spellWork.forEach((spell) => {


  const spellJar= scene.add.image(spell.x, spell.y, spell.jar).setScale(spell.scale).setInteractive({ cursor: 'pointer' });

  spellJar.on('pointerover', () => {
    tooltipIngredient.setText(spell.name)
    tooltipIngredient.setPosition(spell.x, spell.y)
    tooltipIngredient.setVisible(true)

  })

  spellJar.on('pointerout', () => {
    tooltipIngredient.setVisible(false)
  })

  spellJar.on('pointermove', (pointer) => {
    tooltipIngredient.setPosition(pointer.worldX + 10, pointer.worldY + 10)
  })



  spellJar.on('pointerdown', () => {
    const ingredientExists= spellIngredients.some(ing => ing.texture.key === spell.ingredient)

    if(!ingredientExists) {
      const ingredient= scene.add.image(spell.x, spell.y, spell.ingredient).setScale(0.1).setInteractive({ cursor: 'grab' }).setDepth(2)

      ingredient.on('pointerover', () => {
        scene.input.setDefaultCursor('grab');
      })

      ingredient.on('pointerout', () => {
        scene.input.setDefaultCursor('grab');
      })

      scene.input.setDraggable(ingredient)
      spellIngredients.push(ingredient)
    } else {
      console.log(`${spell.ingredient} already exists.`);
      handleIngredientMsg(scene, spell.name)
    }

    scene.pickIngredient.play()
   
  })

       scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        scene.input.setDefaultCursor('grabbing');
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      
      scene.input.on('dragend', (pointer, gameObject) => {
        scene.input.setDefaultCursor('grab');
        const withinCauldron = Phaser.Geom.Intersects.CircleToRectangle(
          cauldronOpenCircle,
          gameObject.getBounds()
        );

        if (withinCauldron) {
          scene.input.setDefaultCursor('grab');
          gameObject.setPosition(
            cauldronOpenCircle.x + Phaser.Math.Between(-40, 40), 
            cauldronOpenCircle.y + Phaser.Math.Between(-40, 40)
          );

      
          switch(gameObject.texture.key) {
            case 'cinnamon-stick-ingredient': stepCompletion[0]= true;
            break;
            case 'green-aventurine-ingredient': stepCompletion[1]= true;
            break;
            case 'bay-leaf-ingredient': stepCompletion[2]= true;
            break;
            case 'moon-drop-ingredient': 
         
              gameObject.setVisible(false)

              if(!moonWaterIngredient1) {
                moonWaterIngredient1= scene.add.image(
                  cauldronOpenCircle.x - 12,
                  cauldronOpenCircle.y - 32,
                  'moon-water-ingredient-1'
                ).setScale(0.3).setDepth(5).setAlpha(0.25)
                
                stepCompletion[4]= true
              }     
            break;
          }

            if(gameObject.texture.key === 'moon-drop-ingredient') {
            scene.moonWater.play()   
          } else{
            scene.dropIngredient.play()
          }
          console.log(` ${spell.ingredient} dropped into the cauldron!`);
        } else {
          console.log('ingredient missed the cauldron!');
        }
      });


    

    })

    const manifestPaper= scene.add.image(centerX + 130, centerY - 170, 'manifest-paper').setScale(0.3).setOrigin(0.5, 0.5)

    const manifestInput= scene.add.dom(centerX + 130, centerY - 170).createFromHTML(`
      <div class="container">
        <textarea class="textarea" placeholder="write your wish"></textarea>
       <button class="fold">Fold</button>
      </div>
      
      `)

      manifestPaper.setDepth(1)
      manifestInput.setDepth(2)

      manifestInput.addListener('click')

      
     manifestInput.on('click', (event) => {
      if(event.target.className === 'fold') {
        const textareaValue= manifestInput.node.querySelector('.textarea').value

        if(textareaValue.trim() === '') {
       
          handleWishMsg(scene)
 
         return; 
        } 

        manifestPaper.setVisible(false)
        manifestInput.setVisible(false)

        if(!scroll) {
          scroll= scene.add.image(centerX + 130, centerY - 170, 'scroll').setScale(0.35).setInteractive({cursor: 'grab'}).setOrigin(0.5, 0.5).setDepth(2)

          scroll.on('pointerover', () => {
           scene.input.setDefaultCursor('grab')
          })
    
          scroll.on('pointerout', () => {
            scene.input.setDefaultCursor('grab')
          })

          
        }
      

        scene.input.setDraggable(scroll)
        scene.pickIngredient.play()
      
      }
     
     })

     scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      scene.input.setDefaultCursor('grabbing')
      gameObject.x= dragX,
      gameObject.y= dragY
     })

     scene.input.on('dragend', (pointer, gameObject) => {
      scene.input.setDefaultCursor('grab')
      const withinCauldron= Phaser.Geom.Intersects.CircleToRectangle(
        cauldronOpenCircle,
        gameObject.getBounds()
      )

      if(gameObject.texture && gameObject.texture.key === 'scroll') {
        if(withinCauldron) {
          scene.input.setDefaultCursor('grab')
          gameObject.setPosition(
            cauldronOpenCircle.x + Phaser.Math.Between(-50, 50),
            cauldronOpenCircle.y + Phaser.Math.Between(-50, 50)
          )


          switch(gameObject.texture.key) {
            case 'scroll': stepCompletion[3]= true;
            break;
          }
      
        scene.dropIngredient.play()
        console.log('Scroll dropped into the cauldron!');
      }else {
        console.log('scroll Missed the cauldron!');
      }
      }
     

     })

  

  const openRadiuss = cauldron.displayWidth * 0.15;
  const openYY = cauldron.y - (cauldron.displayHeight * -0.26);

  const cauldronOpenCirclee = new Phaser.Geom.Circle(
    cauldron.x - 60,
    openYY,
    openRadiuss
  );

    const spoon= scene.add.image(centerX - 530, centerY - 150, 'spoon').setScale(0.25).setInteractive({cursor:'grab'}).setOrigin(0.5, 0.5).setDepth(1)
     scene.input.setDraggable(spoon)

     spoon.on('pointerover', () => {
      scene.input.setDefaultCursor('grab')
    })

     spoon.on('pointerout', () => {
      scene.input.setDefaultCursor('grab')
    })
  

     let isStirring= false
     let stirringAngle= 0
     const stirSpeed= 0.05

     let spoonAlertShown= false;
     spoon.on('pointerdown', () => {
      scene.input.setDefaultCursor('grabbing')

      const ingredientsAdded = stepCompletion[0] && stepCompletion[1] &&
                               stepCompletion[2] && stepCompletion[3] && stepCompletion[4];
      if (!ingredientsAdded) {
        if(!spoonAlertShown) {
           handleSpoonMsg(scene)
          spoonAlertShown= true
        }
       
        return;
      }

      scene.pickIngredient.play()

    });
     scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      scene.input.setDefaultCursor('grabbing')
      if(gameObject === spoon) {
      const ingredientsAdded = stepCompletion[0] && stepCompletion[1] &&
      stepCompletion[2] && stepCompletion[3] && stepCompletion[4];
      
        if (!ingredientsAdded) {
          if(!spoonAlertShown) {
            handleSpoonMsg(scene)
            spoonAlertShown= true
          }
            return;
        }
      }
     
      gameObject.x= dragX
      gameObject.y= dragY

      const withinCauldron= Phaser.Geom.Intersects.CircleToRectangle(
        cauldronOpenCirclee,
        gameObject.getBounds()
      )

      if(gameObject === spoon && withinCauldron){
        const ingredientsAdded = stepCompletion[0] && stepCompletion[1] &&
        stepCompletion[2] && stepCompletion[3] && stepCompletion[4];
        
          if (!ingredientsAdded) {
            if(!spoonAlertShown) {
              handleSpoonMsg(scene)
              spoonAlertShown= true
            }
              return;
          }

        isStirring= true

        switch(gameObject.texture.key){
          case 'spoon': stepCompletion[5]= true;
          break;
        }
     
      
      } else{
        isStirring= false
      }
     })

     scene.input.on('dragend', (pointer, gameObject) => {
      if(gameObject === spoon) {
        scene.input.setDefaultCursor('grab')
        isStirring= false
        spoon.setScale(0.25)
        spoonAlertShown= false
      }
     })

     scene.input.on('pointermove', (pointer, gameObject) => {
   
      if(gameObject === spoon) {
        const ingredientsAdded = stepCompletion[0] && stepCompletion[1] &&
        stepCompletion[2] && stepCompletion[3] && stepCompletion[4];
        
          if (!ingredientsAdded) {
            if(!spoonAlertShown) {
              handleSpoonMsg(scene)
              spoonAlertShown= true
            }
              return;
          }
      }
     

      if(isStirring) {
        scene.input.setDefaultCursor('grabbing')
        spoon.setScale(0.3)
        stirringAngle += stirSpeed

        const reducedRadius = cauldronOpenCirclee.radius - 20; 
        spoon.x = cauldronOpenCirclee.x + Math.cos(stirringAngle) * reducedRadius;
        spoon.y = cauldronOpenCirclee.y + Math.sin(stirringAngle) * reducedRadius;
        console.log('Mixing ingredients in the cauldron!');

        if(!scene.mixIngredients.isPlaying) {
          scene.mixIngredients.play()
        }
       

        spellIngredients.forEach((ingredient) => {
          ingredient.rotation += 0.02
        })

        if(scroll) {
          scroll.rotation += 0.02
        }

        if(moonWaterIngredient1) {
          moonWaterIngredient1.setOrigin(0.5, 0.5).setScale(0.28)
          moonWaterIngredient1.rotation += 0.001
        }

        if (Phaser.Math.Between(0, 100) < 50) {
          const bubbleGroup= scene.add.group()
            const colorBubble= 'green-bubble'
          const tint= '0x66ffcc'
        
          spawnBubble(scene, bubbleGroup, colorBubble, cauldronOpenCircle, tint);
        }

       
      } else{
        if(scene.mixIngredients.isPlaying) {
          scene.mixIngredients.stop()
        }
      }
 
})

       if(!scene.anims.exists('cauldron-water-money')) {  
      scene.anims.create({
        key: 'cauldron-water-money',
        frames: scene.anims.generateFrameNumbers('stirring-animation-money', {start: 0, end:3}),
        frameRate: 0.5,
        repeat: 0
       })
      }
      
      scene.time.addEvent({
        delay: 10, 
        loop: true,
        callback: () => {
          stirringLiquid.angle += 0.01; 
        }
      });

     const stirringLiquid= scene.add.sprite(cauldronOpenCircle.x - 5, cauldronOpenCircle.y - 27, 'stirring-animation-money').setScale(0.3).setDepth(5).setVisible(false)
     
       

    const brewBtn= scene.add.dom(10, 450).createFromHTML(`
      <button class="brew-btn">Start brewing</button>
      `).setDepth(10).setInteractive().setOrigin(0, 0)

    
    const brewButton= document.querySelector('.brew-btn')

      let isBrewed= false
      let bubbleTimer;
      brewButton.addEventListener('click', () => {
        const ingredientsAdded = stepCompletion[0] && stepCompletion[1] &&
        stepCompletion[2] && stepCompletion[3] && stepCompletion[4] && stepCompletion[5]
        
          if (!ingredientsAdded) {
           
            handleBrewMsg(scene)
             
            
              return;
          }
        stirringLiquid.setVisible(true)
        stirringLiquid.play('cauldron-water-money')


        bubbleTimer= scene.time.addEvent({
          delay: 50,
          loop: true,
          callback: () => {
            const bubbleGroup= scene.add.group()
            const colorBubble= 'green-bubble'
            const tint= '0x66ffcc'

            spawnBubble(scene, bubbleGroup, colorBubble, cauldronOpenCircle, tint);
          }
        })
  
        
        brewBtn.setVisible(false)
        stepCompletion[6]=true
       

       spellIngredients.forEach(ingredient => ingredient.setVisible(false))

        if(scroll){
          scroll.setVisible(false)
        }
      
        if(moonWaterIngredient1) {
          moonWaterIngredient1.setVisible(false)
        
        }
       
        
        stirringLiquid.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          isBrewed= true
         
        

          handleExtractionMsg(scene)
         
        })

        scene.brewingButton.play()
        scene.brewing.play()
      
      })


      const emptyJar= scene.add.image(centerX + 180, centerY + 100, 'empty-jar').setScale(0.3).setInteractive().setOrigin(0.5, 0.5)
      const greenWater= scene.add.image(centerX + 183, centerY + 95, 'green-water').setScale(0.3).setInteractive().setOrigin(0.5, 0.5).setVisible(false)

      
         const openRadiusJar = emptyJar.displayWidth * 0.3;
          const openYJar = emptyJar.y - (cauldron.displayHeight * 0.01);

          const emptyJarOpenCircle = new Phaser.Geom.Circle(
            emptyJar.x,
            openYJar,
            openRadiusJar
          );

         
       let greenDrop;
       cauldron.on('pointerdown', () => {
        if(!isBrewed) return;

        if(bubbleTimer) {
          bubbleTimer.remove()
        }

        scene.brewing.stop()

        if(!greenDrop) {

        

        greenDrop= scene.add.image(centerX - 300, centerY + 100, 'green-drop').setScale(0.3).setInteractive({cursor: 'grab'})
        stirringLiquid.setVisible(false)

        greenDrop.on('pointerover', () => {
          scene.input.setDefaultCursor('grab')
        })
  
        greenDrop.on('pointerout', () => {
          scene.input.setDefaultCursor('grab')
        })

        scene.input.setDraggable(greenDrop)

        scene.pickIngredient.play()
      } else{
        console.log('cannot pick twice')
      }

       })

       scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        scene.input.setDefaultCursor('grabbing')
        gameObject.x= dragX,
        gameObject.y= dragY
       })

       scene.input.on('dragend', (pointer, gameObject) => {
        scene.input.setDefaultCursor('grab')
        const withinEmptyJar= Phaser.Geom.Intersects.CircleToRectangle(
          emptyJarOpenCircle,
          gameObject.getBounds()
        )

        if(withinEmptyJar && gameObject === greenDrop){
       
          scene.input.setDefaultCursor('grab')
          

          greenWater.setVisible(true).setScale(0.16)
           gameObject.destroy()

           stepCompletion[7]= true
           console.log('green potion jar added')

           scene.dropWater.play()
     
        } else{
          console.log('missed empty jar')
        }
       })

      
       scene.add.image(centerX + 455, centerY + 80, 'instruction-paper').setScale(0.53)
     

       const stepCompletion= [
           false,
           false,
           false,
           false,
           false,
           false,
           false,
           false
       ]
       const whiteHearts=[]

     
      
        scene.add.dom(centerX + 480, centerY - 90).createFromHTML(`
            <div class="money-heading">Instructions</div>
          `)

      const instructionPaper=  scene.add.dom(centerX + 480, centerY + 270).createFromHTML(`
        <div class="btn-cont">
        <button class="complete-btn-money complete-btn-all">Complete</button>
        </div>
        
        `)
        
        
        const textElements= [
          'Add a cinnamon stick into the cauldron',
          'Add a green aventurine crystal into the cauldron',
          'Add a bay leaf into the cauldron',
          'Write a wish and fold the paper and place it in the cauldron',
          'Add moon water into the cauldron',
          'Mix the ingredients',
          'Start brewing',
          'Place magic potion into empty jar'


        ]
 
       const phaserTextObjects= []

       let currentY = centerY - 75;

        textElements.forEach((line, i) => {
         const text=  scene.add.text(
            centerX + 315,
           currentY,
            line,
            {
              fontSize: '17px',
              fontWeight: 'bold',
              fontFamily: 'Macondo',
              fill: 'black',
              wordWrap: {width: 330}
            }
           )

           phaserTextObjects.push(text)

           const lineHeight = text.height;
           const spacing = 17; 
           currentY += lineHeight + spacing; 
        })
        

        scene.time.delayedCall(0, () => {
        

          phaserTextObjects.forEach((textObj, index) => {
          
            const yPosition= textObj.y + textObj.height / 2

            const whiteHeart= scene.add.image(centerX + 295, yPosition, 'white-heart').setScale(0.05).setInteractive({cursor: 'pointer'})
     
            whiteHeart.stepIndex= index
     
          
             whiteHeart.on('pointerdown', () => {
     
               if(stepCompletion[whiteHeart.stepIndex]) {
                 whiteHeart.setTexture('green-heart').setScale(0.06)
     
                 scene.heartButton.play()
               } else{
                handleStepMsg(scene)
               }
             
             })
            
             whiteHearts.push(whiteHeart)
            })
     
        })
   
       instructionPaper.addListener('click')
      
       instructionPaper.on('click', (event) => {
        if(event.target.classList.contains('complete-btn-money')) {
        
          const stepsCompleted= stepCompletion.every(val => val === true) 
          const allRedHearts= whiteHearts.every(heart => heart.texture.key === 'green-heart')

          if(!stepsCompleted ) {
            handleCompleteMsg(scene)
            return;
     
          }


          if(!allRedHearts) {
           handleHeartsMsg(scene)

          } else {
            scene.completedButton.play();
            scene.scene.start('FinalScene', { spell: 'Money' });
          }
        }
          
        })

}