// Player Variables
let player;
let playerXDirection;
let playerYDirection;
let lastXKey = '';
let lastYKey = '';

// Sprite Costume Variables
let idleAniK;
let map;
let mapAni; 

let gameState = "mainMenu";

function preload() 
{
  idleAniK = loadAnimation(imageSequence('Sprites/Kyla_Idle', 4));
  mapAni = loadAnimation('Sprites/Map/RCC First Floor.png');
}

function setup() 
{
  new Canvas(1528, 842);
  
  // Setting Up Player Sprite
  player = new Sprite();
  player.addAni(idleAniK);
  player.rotationLock = true;
  player.debug = true;

  map = new Sprite();
  map.addAni(mapAni);
  map.collider = 'none';

  player.layer = 10;
  map.layer = 1;

  // Disabling Automatic Stuff
  allSprites.autoDraw = false;
  allSprites.autoUpdate = false;
  world.autoStep = false;
}

function draw() 
{
  background(255);
  if (gameState === "mainMenu") mainMenu();
  if (gameState === "introScene") introScene();
  if (gameState === "runGame") runGame();

}

function mainMenu() 
{
  background(255)
  if (mouse.presses()) {
    gameState = "runGame";
  }
}

function introScene() 
{

}

function runGame() 
{
  mouse.visible = false;
  
  playerMovement();
  world.step();

  camera.x = player.x;
  camera.y = player.y;

  camera.on();

  player.ani.frameDelay = 10;

  allSprites.update();
  allSprites.draw();
  camera.off();

}

function playerMovement() 
{
  let acceleration = 0.8;
  let maxSpeed = 6;
  let friction = 0.85;

  if (kb.presses('a')) lastXKey = 'a';
  if (kb.presses('d')) lastXKey = 'd';
  if (kb.presses('w')) lastYKey = 'w';
  if (kb.presses('s')) lastYKey = 's';

  if (kb.released('a')) lastXKey = 'd';
  if (kb.released('d')) lastXKey = 'a';
  if (kb.released('w')) lastYKey = 's';
  if (kb.released('s')) lastYKey = 'w';

  if (!kb.pressing('a') && !kb.pressing('d')) 
  {
    playerXDirection = 0;
  }
  else if (kb.pressing('a') && kb.pressing('d')) 
  {
    if (lastXKey == 'd') 
    {
      playerXDirection = 1;
    } 
    else 
    {
      playerXDirection = -1;
    }
  } 
  else if (kb.pressing('a'))
  {
    playerXDirection = -1;
  } 
  else if (kb.pressing('d')) 
  {
    playerXDirection = 1; 
  }

  if (!kb.pressing('w') && !kb.pressing('s')) 
  {
    playerYDirection = 0;
  }
  else if (kb.pressing('w') && kb.pressing('s')) 
  {
    if (lastYKey == 's') 
    {
      playerYDirection = 1;
    } 
    else 
    {
      playerYDirection = -1;
    }
  }
  else if (kb.pressing('w'))
  {
    playerYDirection = -1;
  }
  else if (kb.pressing('s')) 
  {
    playerYDirection = 1;
  }
  
  if (playerXDirection == 0 && playerYDirection == 0) 
  {
    playerIsMoving = false;
  } 
  else 
  {
    playerIsMoving = true;
  }

  let magnitude = Math.sqrt(playerXDirection ** 2 + playerYDirection ** 2)

  if (magnitude > 1) 
  {
    playerXDirection /= magnitude;
    playerYDirection /= magnitude;
  }
  
  player.vel.x += playerXDirection * acceleration;
  player.vel.y += playerYDirection * acceleration;


  if (playerXDirection == 0) player.vel.x *= friction;
  if (playerYDirection == 0) player.vel.y *= friction;

  player.vel.x = constrain(player.vel.x, -maxSpeed, maxSpeed);
  player.vel.y = constrain(player.vel.y, -maxSpeed, maxSpeed);
}

function imageSequence(prefix, numFrames, extension=".png") 
{
  let sequence = []; 
  for (let i = 0; i < numFrames; i++) 
  {
    sequence[i] = prefix + i + extension;
  }
  return sequence;
}

