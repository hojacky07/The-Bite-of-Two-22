// Player Variables
let player;
let playerXDirection;
let playerYDirection;
let lastXKey = '';
let lastYKey = '';

// Sprite Costume Variables
let idleAniK;
let walkLAniK;
let walkRAniK;
let walkUAniK;
let walkDAniK;
let map;
let floor1; 

let gameState = "mainMenu";
let level = 1;

//Collision Sprites
let TopWall1;

function preload() 
{
  idleAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_Idle', 4));
  walkLAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkLeft', 5));
  walkRAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkRight', 5));
  walkUAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkUp', 4));
  walkDAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkDown', 4));
  floor1 = loadImage('Sprites/Map/RCC First Floor.png');
}

function setup() 
{
  new Canvas(1528, 842);
  
  // Setting Up Player Sprite
  player = new Sprite();
  player.addAni('idle', idleAniK);
  player.addAni('walkLeft', walkLAniK);
  player.addAni('walkRight', walkRAniK);
  player.addAni('walkUp', walkUAniK);
  player.addAni('walkDown', walkDAniK);
  player.h = 16;
  player.anis.offset.y = -127.5;
  player.rotationLock = true;
  player.debug = true;

  // Setting Up Level 1 Collision Sprites
  TopWall1 = new Sprite(-600, -480, 2000, 200); 
  TopWall1.collider = 'static';
  TopWall1.debug = true;

  map = new Sprite(0,0, 9600, 5400);
  map.image = floor1;
  map.collider = 'none';
  map.debug = true;

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
  stroke(0);
  if (gameState === "mainMenu") mainMenu();
  if (gameState === "introScene") introScene();
  if (gameState === "runGame") runGame();
  text("X: " + floor(mouse.x) + " Y: " + floor(mouse.y), 20, 30);
}

function mainMenu() 
{
  background(255)
  if (mouse.presses()) {
    gameState = "introScene";
  }
}

function introScene() 
{
  if (frameCount > 120) {
    gameState = "runGame";
  }
}

function runGame() 
{
  clear();
  mouse.visible = true;
  
  playerMovement();
  world.step();

  camera.x = player.x;
  camera.y = player.y;

  if (level == 1) {
    map.image = floor1;
  }

  camera.on();



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

  if (playerXDirection == 0 && playerYDirection == 0) 
  {
    player.ani.frameDelay = 10;
    player.ani = 'idle';
  }
  else if (playerXDirection <  -0.5)
  {
    player.ani.frameDelay = 8;
    player.ani = 'walkLeft';
  }
  else if (playerXDirection > 0.5)
  {
    player.ani.frameDelay = 8;
    player.ani = 'walkRight';
  }
  else if (playerYDirection < -0.5)
  {
    player.ani.frameDelay = 10; 
    player.ani = 'walkUp';
  }
  else if (playerYDirection > 0.5)
  {
    player.ani.frameDelay = 10; 
    player.ani = 'walkDown';
  }
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

