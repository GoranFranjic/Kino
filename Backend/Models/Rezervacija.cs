using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Rezervacija: Entitet
    {
        [ForeignKey("film")]
        public required Film Film { get; set; }

        [ForeignKey("kupac")]
        public required Kupac Kupac { get; set; }
        public int? BrojSjedala { get; set; }
        public DateTime? Datum { get; set; }
    }
}
