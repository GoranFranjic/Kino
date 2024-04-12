using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija: Entitet
    {
        [ForeignKey("film_id")]
        public string? Film { get; set; }

        [ForeignKey("kupac_id")]
        public string? Kupac { get; set; }
        public int BrojSjedala { get; set; }
        public DateOnly Datum { get; set; }
    }
}
