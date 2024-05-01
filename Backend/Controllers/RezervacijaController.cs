using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Backend.Mappers;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijeController : EdunovaController<Rezervacija, RezervacijaDTORead, RezervacijaDTOInsertUpdate>
    {
        public RezervacijeController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Rezervacije;
            _mapper = new MappingRezervacija();
        }

        protected override List<RezervacijaDTORead> UcitajSve()
        {
            var lista = _context.Rezervacije
                    .Include(g => g.Film)
                    .Include(g => g.Kupac)
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected override Rezervacija NadiEntitet(int id)
        {
            return _context.Rezervacije.Include(i => i.Film).Include(i => i.Kupac)
                    .FirstOrDefault(x => x.Id == id) ?? throw new Exception("Ne postoji rez s Id-om " + id + " u bazi");
        }

        protected override Rezervacija KreirajEntitet(RezervacijaDTOInsertUpdate dto)
        {
            var film = _context.Filmovi.Find(dto.FilmId) ?? throw new Exception("Ne postoji " + dto.FilmId + " u bazi");
            var kupac = _context.Kupci.Find(dto.KupacId) ?? throw new Exception("Ne postoji kupac s šifrom " + dto.KupacId + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Film = film;
            entitet.Kupac = kupac;
            return entitet;
        }

        protected override Rezervacija PromjeniEntitet(RezervacijaDTOInsertUpdate dto, Rezervacija entitet)
        {
            var film = _context.Filmovi.Find(dto.FilmId) ?? throw new Exception("Ne postoji film " + dto.FilmId + " u bazi");
            var kupac = _context.Kupci.Find(dto.KupacId) ?? throw new Exception("Ne postoji kupac " + dto.KupacId + " u bazi");



            entitet.Broj_Sjedala = dto.Broj_Sjedala;
            entitet.Datum = dto.Datum;
            
            entitet.Film = film;
            entitet.Kupac = kupac;

            return entitet;
        }

        protected override void KontrolaBrisanje(Rezervacija entitet)
        {
            // Implementirati logiku za brisanje
        }
    }
}
// overide include kupac , include film