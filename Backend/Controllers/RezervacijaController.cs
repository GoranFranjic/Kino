using Backend.Data;
using Backend.Mappers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijaController : EdunovaController<Rezervacija, RezervacijaDTORead, RezervacijaDTOInsertUpdate>
    {
        public RezervacijaController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Rezervacije;
            _mapper = new MappingRezervacija();
        }
        protected override void KontrolaBrisanje(Rezervacija entitet)
        {
            /*if (entitet!=null && entitet.Film != null && entitet.Film.Count() > 0)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Rez se ne može obrisati: ");
                foreach (var e in entitet.Kupac)
                {
                  //  sb.Append(e.Film).Append(' ').Append(e.Kupac).Append(", ");
                }

                throw new Exception(sb.ToString()[..^2]);
            }*/
        }

        protected override Rezervacija KreirajEntitet(RezervacijaDTOInsertUpdate dto)
        {
            var smjer = _context.Kupci.Find(dto.FilmId) ?? throw new Exception("Ne postoji Film s šifrom " + dto.FilmId + " u bazi");
            var entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            //entitet.Kupac = kupac;
            return entitet;
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
            return  _mapper.MapReadList(lista);
        }

        protected override Rezervacija NadiEntitet(int id)
        {
            return _context.Rezervacije.Include(i => i.Kupac).FirstOrDefault(x => x.Id == id) ?? throw new Exception("Ne postoji s id " + id + " u bazi");
        }



        protected override Rezervacija PromjeniEntitet(RezervacijaDTOInsertUpdate dto, Rezervacija entitet)
        {
            var smjer = _context.Kupci.Find(dto.FilmId) ?? throw new Exception("Ne postoji kupac s šifrom " + dto.FilmId + " u bazi");


            /*
            List<Polaznik> polaznici = entitet.Polaznici;
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = polaznici;
            */

            // ovdje je možda pametnije ići s ručnim mapiranje
            
            
            entitet.Film = dto.FilmId;
           



            return entitet;
        }
    }
}
