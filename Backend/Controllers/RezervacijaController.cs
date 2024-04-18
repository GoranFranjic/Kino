using System.Text;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijeController : EdunovaController<Rezervacija, RezervacijaDTORead, RezervacijaDTOInsertUpdate>
    {
        public RezervacijeController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Rezervacije;
        }
        protected override void KontrolaBrisanje(Rezervacija entitet)
        {
            var lista = _context.Filmovi;

            {
                StringBuilder sb = new();
                sb.Append("Rezervacija se ne može obrisati: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Naziv).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }
    }
}