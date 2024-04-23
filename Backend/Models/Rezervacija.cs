using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija: Entitet
    {
        [ForeignKey("film_id")]
        public required Film Film { get; set; }

        [ForeignKey("kupac_id")]
        public required Kupac Kupac { get; set; }
        public int? Broj_Sjedala { get; set; }
        public DateTime? Datum { get; set; }
    }
}
