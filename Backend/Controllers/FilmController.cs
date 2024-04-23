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

        }
    }
}
