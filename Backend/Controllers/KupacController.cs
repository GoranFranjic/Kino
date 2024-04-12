using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KupacController : EdunovaController<Kupac, KupacDTORead, KupacDTOInsertUpdate>
    {
        public KupacController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Kupci;
        }
        protected override void KontrolaBrisanje(Kupac entitet)
        {
            var lista = _context.Rezervacije
                .Include(x => x.Kupac)
                //.Where(x => x.Kupac.Id == entitet.Id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Kupac se ne može obrisati jer je postavljen na rezervacijama: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Film).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }
}
