
export function createTooltip(scene){
  const tooltip= scene.add.text(0,0, '', {
    font: '16px serif',
    fill: '#fff',
    backgroundColor: '#333',
    padding: {x:6, y:4},
    borderRadius: 4
   }).setDepth(50).setVisible(false)

   return tooltip;
}

export function tooltipOnIngredients(scene, spell, centerY) {
  const tooltipIngredient= scene.add.text(0,0,'', {
    font: '16px "Creepster", serif',
    fill: '#ffffff',
    backgroundColor: '#2e003e',
    padding: {x: 10, y: 5},
    borderRadius: 5
  }).setDepth(50).setVisible(false)

  return tooltipIngredient;
}