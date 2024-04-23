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
            
        }
    }
}