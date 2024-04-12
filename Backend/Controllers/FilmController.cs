using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FilmController
    {
        // Dependency injection
        // Definiraš privatno svojstvo
        private readonly EdunovaContext _context;

        // Dependency injection
        // U konstruktoru primir instancu i dodjeliš privatnom svojstvu
        public FilmController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Rezervacije.ToList());
        }

        [HttpPost]
        public IActionResult Post(Film kupac)
        {
            
            _context.SaveChanges();
            return new JsonResult(kupac);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Film kupac)
        {
            var kupacIzBaze = _context.Rezervacije.Find(id);
            // za sada ručno, kasnije će doći Mapper
            kupacIzBaze.Film = kupac.Naziv;
            
            

            _context.Rezervacije.Update(kupacIzBaze);
            _context.SaveChanges();

            return new JsonResult(kupacIzBaze);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var kupacIzBaze = _context.Rezervacije.Find(id);
            _context.Rezervacije.Remove(kupacIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka="Obrisano"});
        }

    }
}
