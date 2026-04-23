class StageController 
{
    constructor(initialStage, canvasWidth, canvasHeight) 
    {
        this.stage = initialStage;
        this.stageSprite = new Sprite(canvasWidth / 2, canvasHeight / 2);
        this.stageSprite.collider = 'none';
        this.stageSprite.layer = 0;
    }
    
    UpdateStage(stage) 
    {
        this.stage = stage;
    }

    MoveStageSprite(velX, velY) 
    {
        this.stageSprite.vel.x = -velX;
        this.stageSprite.vel.y = -velY;
    }

}