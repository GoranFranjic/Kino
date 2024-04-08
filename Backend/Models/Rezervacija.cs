namespace Backend.Models
{
    public class Rezervacija: Entitet
    {
        public int? Film { get; set; }
        public int? Kupac { get; set; }
        public int? BrojSjedala { get; set; }
        public DateOnly? Datum { get; set; }
    }
}
