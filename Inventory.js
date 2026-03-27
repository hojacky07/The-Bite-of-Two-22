class Inventory 
{
    constructor(slot, x, y) 
    {
        this.slot = slot;
        this.x = x;
        this.y = y;
        this.item = "empty";

        this.sprite = new Sprite(this.x,this.y,48,48);
        this.sprite.color = "white";
        this.sprite.text = slot;
        this.sprite.collider = 'none';
    }

    RemoveItem() 
    {
        this.item = "empty";
    }

    AddItem(item) 
    {
        if (this.item == "empty") 
        {
            this.item = item;
        }
    }
}
