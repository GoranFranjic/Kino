using System.Text;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KupciController : EdunovaController<Kupac, KupacDTORead, KupacDTOInsertUpdate>
    {
        public KupciController(EdunovaContext context) : base(context)
        {
            DbSet = _context.Kupci;
        }
        protected override void KontrolaBrisanje(Kupac entitet)
        {
           
        }
    }
}