using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijaController : ControllerBase
    {
        // Dependency injection
        // Definiraš privatno svojstvo
        private readonly EdunovaContext _context;

        // Dependency injection
        // U konstruktoru primir instancu i dodjeliš privatnom svojstvu
        public RezervacijaController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Rezervacije.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return new JsonResult(_context.Rezervacije.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Rezervacija rezervacija)
        {
            //_context.Rezervacije.Add(rezervacija);
            _context.SaveChanges();
            return new JsonResult(rezervacija);
        }

       


        
           

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var rezervacijaIzBaze = _context.Rezervacije.Find(id);
            _context.Rezervacije.Remove(rezervacijaIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }

    }
}