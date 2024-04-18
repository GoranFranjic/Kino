
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KupacDTORead(int Id, string Ime, string Prezime, string Email, string BrojTelefona);
    public record KupacDTOInsertUpdate([Required(ErrorMessage = "Ime obavezno")] string? Ime, string? Prezime, string? Email, string? BrojTelefona);
    public record FilmDTORead(int Id, string? Naziv, int? Trajanje, string? Dvorana);
    public record FilmDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
           int? Trajanje, string? Dvorana);
}
