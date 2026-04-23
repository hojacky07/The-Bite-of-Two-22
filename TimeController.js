class TimeController
{
    constructor()
    {
        this.time = 0;
        this.day = 0;
        this.isDay = true;
    }

    IncreaseTimeSpent() 
    {
        this.time += 1;
    }

    DecreaseTimeSpent() 
    {
        this.time -= 1;
    }

    UpdateTimeOfDay() 
    {
        if (this.time > 5) 
            {
            this.isDay = false;
        } 
        else if (this.time <= 5) 
        {
            this.isDay = true;
        }

        if (this.time > 10) 
        {
            this.time = 0;
            this.day += 1;
        }
    }
}