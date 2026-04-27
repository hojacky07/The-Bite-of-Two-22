// Player Variables
let player;
let playerXDirection;
let playerYDirection;
let lastXKey = '';
let lastYKey = '';

// Kyla The Player
let idleDownAniK;
let idleUpAniK;
let walkLAniK;
let walkRAniK;
let walkUAniK;
let walkDAniK;
let dialogueKyla;
let showDialogueKyla = false;

//NPC Stan
let stanIdleAni;
let showDialogueStan = false;
let dialogueStan;
let kylaSDNum = 1;
let kylaSD1;
let kylaSD2;
let stanDNum = 1;
let stanD1;
let stanD2;

let map;
let floor1; 

let titleScreen;
let startButton;
let startButtonImg;
let exitButton;

// Game Variables
let gameState = "mainMenu";
let level = 1;
let dialogueTimer = 0;
let convoStep = 0; 
let interactNum;
let clock = [];

//Collision Sprites
let level1Walls;
let level2Walls;
let level3Walls;

//NPC Sprites
let stanNPC;
let stanNPCXtraCollider;

function preload() 
{
  idleDownAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_Idle', 4));
  idleUpAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_IdleUp', 4));
  walkLAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkLeft', 5));
  walkRAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkRight', 5));
  walkUAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkUp', 4));
  walkDAniK = loadAnimation(imageSequence('Sprites/Kyla/Kyla_WalkDown', 4));
  floor1 = loadImage('Sprites/Map/RCC First Floor.png');
  stanIdleAni =loadAnimation(imageSequence('Sprites/NPC/Stan/Stan_Idle', 4))
  dialogueStan = loadImage('Sprites/NPC/Stan/DialogueStan.png');
  stanD1 = loadImage('Sprites/NPC/Stan/Stan_D_1.png');
  stanD2 = loadImage('Sprites/NPC/Stan/Stan_D_2.png');
  dialogueKyla = loadImage('Sprites/Kyla/DialogueKyla.png');
  kylaSD1 = loadImage('Sprites/Kyla/KylaSD_1.png');
  kylaSD2 = loadImage('Sprites/Kyla/KylaSD_2.png');
  titleScreen = loadImage('Title Screen.png');
  startButtonImg = loadImage('Start Button.png');

  for (let i = 0; i < 6; i++) {
    clock[i] = loadImage(`Clock${i}.png`);
  }
}

function setup() 
{
  new Canvas(1528, 842);
  interactNum = 0;

  player = new Sprite();
  player.addAni('idleDown', idleDownAniK);
  player.addAni('walkLeft', walkLAniK);
  player.addAni('walkRight', walkRAniK);
  player.addAni('walkUp', walkUAniK);
  player.addAni('walkDown', walkDAniK);
  player.addAni('idleUp', idleUpAniK)
  player.h = 16;
  player.anis.offset.y = -127.5;
  player.collider = 'dynamic';
  player.rotationLock = true;
  player.debug = false;

  stanNPC = new Sprite(1190, -40, 105, 355);
  stanNPC.addAni('idle', stanIdleAni);
  stanNPC.ani.frameDelay = 10;
  stanNPC.collider = 'kinematic';
  stanNPC.debug = false;

  stanNPCXtraCollider = new Sprite(1190, -50, 105, 345);
  stanNPCXtraCollider.collider = 'static';
  stanNPCXtraCollider.visible = false;
  stanNPCXtraCollider.debug = false;

  level1Walls = new Group();
  level1Walls.collider = 'static';
  level1Walls.collider.visible = false;
  level1Walls.debug = false;
  new level1Walls.Sprite(-2967.5, 278, 400, 2675);
  new level1Walls.Sprite(-1765, -520, 2000, 270);
  new level1Walls.Sprite(-726.5, -190, 77, 1200);
  new level1Walls.Sprite(2456, -185, 6288, 550);
  new level1Walls.Sprite(2670,170, 820, 160);
  new level1Walls.Sprite(5775,347.5,350,1615);
  new level1Walls.Sprite(2596,1467.5,6708,625);
  new level1Walls.Sprite(-1965,1698.5,2410,167);
  new level1Walls.Sprite(-730,1315,80,475);
  

  map = new Sprite(0,0, 9600, 5400);
  map.image = floor1;
  map.collider = 'none';
  map.debug = true;

  player.layer = 10;
  map.layer = 1;

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
  image(titleScreen, 0, 0);
  if (mouse.presses()) 
  {
    gameState = "introScene";
  }
}

function introScene() 
{
  if (frameCount > 120) 
  {
    gameState = "runGame";
  }
}

function runGame() 
{
  clear();
  updateLevel();
  mouse.visible = true;
  

  if (convoStep == 0) {
    playerMovement();
  }
  world.step();

  camera.x = player.x;
  camera.y = player.y;

  // Initial trigger
  if (player.overlapping(stanNPC) && (kb.pressed('e')) && convoStep == 0)
  {
    convoStep = 1;
    dialogueTimer = 20;
    player.vel.x = 0;
    player.vel.y = 0;
    player.ani = 'idleUp'
  }

  if (level == 1) 
  {
    map.image = floor1;
  }

  camera.on();
  allSprites.update();
  allSprites.draw();
  camera.off();
  updateClock();
  handleRelayDialogue();
}

function handleRelayDialogue() 
{
  if (convoStep > 0) 
    {
    if (dialogueTimer > 0) dialogueTimer--;

    if (convoStep == 1 || convoStep == 3) 
    {
      image(dialogueKyla, 0, 0);
      if (convoStep == 1) image(kylaSD1, 0, 0);
      if (convoStep == 3) image(kylaSD2, 0, 0);
    } 
    else if (convoStep == 2 || convoStep == 4) 
    {
      image(dialogueStan, 0, 0);
      if (convoStep == 2) image(stanD1, 0, 0);
      if (convoStep == 4) image(stanD2, 0, 0);
    }

    if (kb.released('space') && dialogueTimer <= 0) 
    {
      convoStep++;
      dialogueTimer = 20;
    }

    if (convoStep > 4) 
    {
      interactNum += 1;
      convoStep = 0;
    }
  }
}

function playerMovement() 
{
  let acceleration = 0.8;
  let maxSpeed = 8.5;
  let friction = 0.85;

  if (kb.presses('1')) level = 1;
  if (kb.presses('2')) level = 2;

  if (kb.presses('a')) lastXKey = 'a';
  if (kb.presses('d')) lastXKey = 'd';
  if (kb.presses('w')) lastYKey = 'w';
  if (kb.presses('s')) lastYKey = 's';

  if (kb.released('a')) lastXKey = 'd';
  if (kb.released('d')) lastXKey = 'a';
  if (kb.released('w')) lastYKey = 's';
  if (kb.released('s')) lastYKey = 'w';

  if (!kb.pressing('a') && !kb.pressing('d')) playerXDirection = 0;
  else if (kb.pressing('a') && kb.pressing('d')) playerXDirection = (lastXKey == 'd') ? 1 : -1;
  else if (kb.pressing('a')) playerXDirection = -1;
  else if (kb.pressing('d')) playerXDirection = 1; 

  if (!kb.pressing('w') && !kb.pressing('s')) playerYDirection = 0;
  else if (kb.pressing('w') && kb.pressing('s')) playerYDirection = (lastYKey == 's') ? 1 : -1;
  else if (kb.pressing('w')) playerYDirection = -1;
  else if (kb.pressing('s')) playerYDirection = 1;

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
    player.ani = 'idleDown';
    player.ani.frameDelay = 10;
  }
  else if (playerXDirection < -0.5) 
  {
    player.ani = 'walkLeft';
    player.ani.frameDelay = 8;
  }
  else if (playerXDirection > 0.5)
  {
    player.ani = 'walkRight';
    player.ani.frameDelay = 8;
  }
  else if (playerYDirection < -0.5) 
  {
    player.ani = 'walkUp';
    player.ani.frameDelay = 8;
  }
  else if (playerYDirection > 0.5)
  {
    player.ani = 'walkDown';
    player.ani.frameDelay = 8;
  }
}

function updateClock() 
{
  if (interactNum > 5) 
  {
    interactNum = 0;
  }
  image(clock[interactNum ],0,0);
}

function updateLevel() 
{
  if (level == 1) 
  {
    level1Walls.visible = false;
    level1Walls.collider = 'static';
    stanNPC.visible = true;
    stanNPC.enabled = true;
  } 
  else if (level == 2) 
  {
    level1Walls.visible = false;
    level1Walls.collider = 'none';
    stanNPC.visible = false;
    stanNPC.collider = 'none';
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