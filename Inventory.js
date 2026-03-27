class Inventory 
{
    constructor(slot, x, y) 
    {
        this.slot = slot;
        this.x = x;
        this.y = y;
        this.item = "empty";

        this.sprite = new Sprite(this.x,this.y,64,64);
        this.sprite.text = slot;
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
