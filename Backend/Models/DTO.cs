using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KupacDTORead(int Id, string Ime, string Prezime, string Email, string Broj_telefona);
    public record KupacDTOInsertUpdate([Required(ErrorMessage = "Ime obavezno")] string? Ime, string? Prezime, string? Email, string? Broj_telefona);
    public record FilmDTORead(int Id, string Naziv, int? Trajanje, string Dvorana);
    public record FilmDTOInsertUpdate([Required(ErrorMessage = "Naziv obavezno")]string Naziv, int? Trajanje, string Dvorana);
    public record RezervacijaDTORead(int Id, string FilmNaziv, string KupacImePrezime, int? Broj_Sjedala, DateTime? Datum);

    public record RezervacijaDTOInsertUpdate(
        [Required(ErrorMessage = "Film obavezno")]
        int FilmId,
        [Required(ErrorMessage = "Kupac obavezno")]
        int KupacId,
         int? Broj_Sjedala, DateTime? Datum);

}

