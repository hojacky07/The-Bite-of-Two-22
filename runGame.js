let player;
let inventorySlots = [];

function setup() 
{
  new Canvas(1528, 842);
  player = new Player(764,421);

  stageController = new StageController("RCC Lounge");
  player.SetStageController(stageController);

  for (let i = 0; i < 8; i++)
  {
    let slotNum = i + 1;
    let slotX = i * 47 + 764 - 178;

    inventorySlots.push(new Inventory(slotNum, slotX, 784));
  }
}

function draw() 
{
  background(255);
  player.Move();
  player.UpdateSprite();
  player.UpdateStageController();
  
  for (let i = 0; i < inventorySlots.length; i++) 
  {
    inventorySlots[i].UpdateSlot(inventorySlots);
  }
  fill(0);
  text(player.sprite.y, 20, 40);
  text(stageController.stage, 20, 20);
}

function keyPressed() 
{
  if (kb.presses('1')) 
  {
    
    inventorySlots[0].IsSelected(true);
  }
}
