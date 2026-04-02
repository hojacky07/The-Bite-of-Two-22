class Inventory 
{
    constructor(slot, x, y) 
    {
        this.slot = slot;
        this.x = x;
        this.y = y;
        this.item = "empty";
        this.selected = false;

        this.sprite = new Sprite(this.x,this.y);
        this.sprite.image = `Sprites/Inventory/InventorySlot_${this.slot}.png`;

        this.sprite.collider = 'static';

    }

    IsSelected(selected)
    {        
        this.selected = selected;
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

    UpdateSlot(allSlots) 
    {

        if (kb.presses(`${this.slot}`) || this.sprite.mouse.pressed()) 
        {
            for (let i = 0; i < allSlots.length; i++) 
            {
                allSlots[i].selected = false;
            }
            this.selected = true;
        }

        if (this.selected) 
        {
            this.sprite.image = `Sprites/Inventory/SelectedInventorySlot_${this.slot}.png`;
        } 
        else 
        {
            this.sprite.image = `Sprites/Inventory/InventorySlot_${this.slot}.png`;
        }
    }
}
