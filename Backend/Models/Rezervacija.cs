namespace Backend.Models
{
    public class Rezervacija: Entitet
    {
        public int? FilmId { get; set; }
        public int? KupacId { get; set; }
        public int? BrojSjedala { get; set; }
        public DateTime? Datum { get; set; }
    }
}
