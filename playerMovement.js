// Player Variables
let player;
let playerXDirection;
let playerYDirection;
let playerIsMoving;
let lastXKey = '';
let lastYKey = '';

function setup() {
  new Canvas(1920, 1080);
  player = new Sprite();
  player.width = 64;
  player.height = 64;
  playerXDirection = 0;
  playerYDirection = 0;
  playerIsMoving = false;
}

function draw() {
  background('black');
  PlayerMovement();
}

function PlayerMovement() 
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
  
  player.vel.x += playerXDirection * acceleration;
  player.vel.y += playerYDirection * acceleration;

  if (playerXDirection == 0) player.vel.x *= friction;
  if (playerYDirection == 0) player.vel.y *= friction;

  player.vel.x = constrain(player.vel.x, -maxSpeed, maxSpeed);
  player.vel.y = constrain(player.vel.y, -maxSpeed, maxSpeed);
}