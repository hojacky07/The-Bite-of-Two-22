
class Player {

  constructor(x, y) 
  {
    this.sprite = new Sprite(x,y,64,64);
    this.sprite.color = "blue";
    
    this.playerXDirection = 0;
    this.playerYDirection = 0;
    this.playerIsMoving = false;

    this.lastXKey = '';
    this.lastYKey = '';
  }

  Move() 
  {
    let acceleration = 0.8;
    let maxSpeed = 6;
    let friction = 0.85;

    if (kb.presses('a')) this.lastXKey = 'a';
    if (kb.presses('d')) this.lastXKey = 'd';
    if (kb.presses('w')) this.lastYKey = 'w';
    if (kb.presses('s')) this.lastYKey = 's';

    if (kb.released('a')) this.lastXKey = 'd';
    if (kb.released('d')) this.lastXKey = 'a';
    if (kb.released('w')) this.lastYKey = 's';
    if (kb.released('s')) this.lastYKey = 'w';

    if (!kb.pressing('a') && !kb.pressing('d')) 
    {
      this.playerXDirection = 0;
    }
    else if (kb.pressing('a') && kb.pressing('d')) 
    {
      if (this.lastXKey == 'd') 
      {
        this.playerXDirection = 1;
      } 
      else 
      {
        this.playerXDirection = -1;
      }
    } 
    else if (kb.pressing('a'))
    {
      this.playerXDirection = -1;
    } 
    else if (kb.pressing('d')) 
    {
      this.playerXDirection = 1; 
    }

    if (!kb.pressing('w') && !kb.pressing('s')) 
    {
      this.playerYDirection = 0;
    }
    else if (kb.pressing('w') && kb.pressing('s')) 
    {
      if (this.lastYKey == 's') 
      {
        this.playerYDirection = 1;
      } 
      else 
      {
        this.playerYDirection = -1;
      }
    }
    else if (kb.pressing('w'))
    {
      this.playerYDirection = -1;
    }
    else if (kb.pressing('s')) 
    {
      this.playerYDirection = 1;
    }
    
    if (this.playerXDirection == 0 && this.playerYDirection == 0) 
    {
      this.playerIsMoving = false;
    } 
    else 
    {
      this.playerIsMoving = true;
    }
    
    this.sprite.vel.x += this.playerXDirection * acceleration;
    this.sprite.vel.y += this.playerYDirection * acceleration;

    if (this.playerXDirection == 0) this.sprite.vel.x *= friction;
    if (this.playerYDirection == 0) this.sprite.vel.y *= friction;

    this.sprite.vel.x = constrain(this.sprite.vel.x, -maxSpeed, maxSpeed);
    this.sprite.vel.y = constrain(this.sprite.vel.y, -maxSpeed, maxSpeed);
  }
}