using System.Text;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FilmoviController : EdunovaController<Film, FilmDTORead, FilmDTOInsertUpdate>
    {
        public FilmoviController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Filmovi;
        }
        protected override void KontrolaBrisanje(Film entitet)
        {
            var lista = _context.Kupci;
             
                StringBuilder sb = new();
                sb.Append("Film se ne može obrisati: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Ime).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }
    }
