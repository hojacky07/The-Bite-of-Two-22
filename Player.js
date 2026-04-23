
class Player 
{
  constructor(x, y) 
  {
    this.sprite = new Sprite(x,y);

    this.playerXDirection = 0;
    this.playerYDirection = 0;
    this.targetVelX = 0;
    this.targetVelY = 0;
    this.playerIsMoving = false;
    this.sprite.layer = 10;

    this.lastXKey = '';
    this.lastYKey = '';

    this.playerSelected = "Kyla";
    
  }

  SetStageController(stageController) 
  {
    this.stageController = stageController;
  }

  UpdateStageController() 
  {
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

    let magnitude = Math.sqrt(this.playerXDirection ** 2 + this.playerYDirection ** 2)

    if (magnitude > 1) 
    {
      this.playerXDirection /= magnitude;
      this.playerYDirection /= magnitude;
    }
    
    this.targetVelX += this.playerXDirection * acceleration;
    this.targetVelY += this.playerYDirection * acceleration;

    this.stageController.MoveStageSprite(this.targetVelX, this.targetVelY);

    if (this.playerXDirection == 0) this.targetVelX *= friction;
    if (this.playerYDirection == 0) this.targetVelY *= friction;

    this.targetVelX = constrain(this.targetVelX, -maxSpeed, maxSpeed);
    this.targetVelY = constrain(this.targetVelY, -maxSpeed, maxSpeed);

    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
  }

  UpdateSprite() 
  {
    if (this.playerYDirection == -1) {
      if (this.playerSelected == "Kyla") 
      {
        this.sprite.image = 'Sprites/Player/Kyla_Up.png';
      } 
      else if (this.playerSelected == "Jacky") 
      {
        this.sprite.image = 'Sprites/Player/Jacky_Up.png';
      } 
      else if (this.playerSelected == "Noah") 
      {
        this.sprite.image = 'Sprites/Player/Noah_Up.png';
      }
    }

    if (this.playerYDirection == 1) {
      if (this.playerSelected == "Kyla") 
      {
        this.sprite.image = 'Sprites/Player/Kyla_Down.png';
      } 
      else if (this.playerSelected == "Jacky") 
      {
        this.sprite.image = 'Sprites/Player/Jacky_Down.png';
      } 
      else if (this.playerSelected == "Noah") 
      {
        this.sprite.image = 'Sprites/Player/Noah_Down.png';
      }
    }

    if (this.playerXDirection == 0 && this.playerYDirection == 0) 
    {
      if (this.playerSelected == "Kyla") 
      {
        this.sprite.image = 'Sprites/Player/Kyla_Down.png';
      } 
      else if (this.playerSelected == "Jacky") 
      {
        this.sprite.image = 'Sprites/Player/Jacky_Down.png';
      } 
      else if (this.playerSelected == "Noah") 
      {
        this.sprite.image = 'Sprites/Player/Noah_Down.png';
      }
    } 

    if (this.playerXDirection == -1) {
      if (this.playerSelected == "Kyla") 
      {
        this.sprite.image = 'Sprites/Player/Kyla_Left.png';
      } 
      else if (this.playerSelected == "Jacky") 
      {
        this.sprite.image = 'Sprites/Player/Jacky_Left.png';
      } 
      else if (this.playerSelected == "Noah") 
      {
        this.sprite.image = 'Sprites/Player/Noah_Left.png';
      }
    }

    if (this.playerXDirection == 1) {
      if (this.playerSelected == "Kyla") 
      {
        this.sprite.image = 'Sprites/Player/Kyla_Right.png';
      } 
      else if (this.playerSelected == "Jacky") 
      {
        this.sprite.image = 'Sprites/Player/Jacky_Right.png';
      } 
      else if (this.playerSelected == "Noah") 
      {
        this.sprite.image = 'Sprites/Player/Noah_Right.png';
      }
    }
  }
}