using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public record KupacDTORead(int Id, string Ime, string Prezime,
        int? BrojTelefona)
    {

    };

    public record KupacDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string? Ime
        );



    public record FilmDTORead(int Id, string? Naziv, int? Trajanje, string? Dvorana
        );

    public record FilmDTOInsertUpdate([Required(ErrorMessage = "Naziv obavezno")]
        string? Naziv,
        [Required(ErrorMessage = "Trajanje obavezno")]
        int? Trajanje
        );

    public record RezervacijaDTORead(int Id, string? KupacIme, string? FilmNaziv, int Brojsjedala, DateOnly? Datum
        )
    {
        private string? KupacIme;
        private string? FilmNaziv;
        private DateOnly? Datum;
        private int? Brojsjedala;
    }


    // ako se parametar zove kao svojstvo nekog tipa u toj klasi tada uzima punu putanju klase (npr. EdunovaAPP.Models.Film)

    public record RezervacijaDTOInsertUpdate(

        int? KupacId,
        int? FilmId,
        int? V,
        DateOnly? Datum
        )
    {
        private int id;
        private int? v1;
        private int? v2;
        private DateOnly? datum;


    }
}

