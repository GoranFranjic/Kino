using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Kupac: Entitet
    {
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Email { get; set; }
        public string Broj_telefona { get; set; }
    }
}
