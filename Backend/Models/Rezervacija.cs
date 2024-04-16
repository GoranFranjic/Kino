using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija: Entitet
    {
        [ForeignKey("film_id")]
        public int? Film { get; set; }

        [ForeignKey("kupac_id")]
        public int? Kupac { get; set; }
        public int BrojSjedala { get; set; }
        public DateTime Datum { get; set; }
    }
}
