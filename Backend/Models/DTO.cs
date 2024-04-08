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

    public record RezervacijaDTORead(int Id, string? Ime,
        string? KupacIme, string? FilmNaziv, int Brojsjedala, DateOnly? Datum
        )
    {
        private int? film;
        private int? kupac;
        private DateOnly? datum;
        private int? brojSjedala;

        public RezervacijaDTORead(int id, int? film, int? kupac, DateOnly? datum, int? brojSjedala)
        {
            Id = id;
            this.film = film;
            this.kupac = kupac;
            this.datum = datum;
            this.brojSjedala = brojSjedala;
        }
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

        public RezervacijaDTOInsertUpdate(int id, int? v1, int? v2, DateOnly? datum)
        {
            this.id = id;
            this.v1 = v1;
            this.v2 = v2;
            this.datum = datum;
        }
    }
}

