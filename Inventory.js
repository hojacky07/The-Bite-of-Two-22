class Inventory 
{
    constructor(slot, x, y) 
    {
        this.slot = slot;
        this.x = x;
        this.y = y;
        this.item = "empty";

        this.sprite = new Sprite(this.x,this.y,96,96);
        this.sprite.image = `Sprites/Inventory/InventorySlot_${this.slot}.png`;
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
