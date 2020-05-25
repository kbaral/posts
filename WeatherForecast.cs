using System;

namespace ReactCore
{
    public class WeatherForecast
    {
        public int Id { get; set; }
        public string Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}
