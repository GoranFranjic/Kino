﻿
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KupacDTORead(int Id, string ImeK, string PrezimeK,
        string EmailK,string BrojTel);

    public record KupacDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string? Ime);
        
      
    public record RezervacijaDTORead( int Id, string? FilmNaziv,
        string? KupacNaziv, int Brojsjedala, DateOnly DatumR);
  
    public record RezervacijaDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        [StringLength(5, ErrorMessage = "Naziv grupe ne može imati više od 5 znakova ")]
        string? Naziv,
        [Required(ErrorMessage = "Kuoac obavezno")]
        string? FilmId, 
        DateOnly? DatumR,
        [Required(ErrorMessage = "Broj sjedala obavezno")]
        [Range(0, 30, ErrorMessage = "{0} mora biti između {1} i {2}")]
        int? Brojsjedala= 0);
}
