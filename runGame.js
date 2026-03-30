let player;
let inventorySlots = [];

function setup() 
{
  new Canvas(1528, 842);
  player = new Player(764,421);
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
}
