using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KupacController : ControllerBase
    {
        // Dependency injection
        // Definiraš privatno svojstvo
        private readonly EdunovaContext _context;

        // Dependency injection
        // U konstruktoru primir instancu i dodjeliš privatnom svojstvu
        public KupacController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Kupci.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return new JsonResult(_context.Kupci.Find(id));
        }

        [HttpPost]
        public IActionResult Post(Kupac kupac)
        {
            _context.Kupci.Add(kupac);
            _context.SaveChanges();
            return new JsonResult(kupac);
        }

       


        
        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, Kupac kupac)
        {
            var kupacIzBaze = _context.Kupci.Find(id);
            // za sada ručno, kasnije će doći Mapper
            kupacIzBaze.Ime = kupac.Ime;
            kupacIzBaze.Prezime = kupac.Prezime;
            kupacIzBaze.Email = kupac.Email;
            kupacIzBaze.Broj_telefona = kupac.Broj_telefona;

            _context.Kupci.Update(kupacIzBaze);
            _context.SaveChanges();

            return new JsonResult(kupacIzBaze);
        }
        

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int id)
        {
            var smjerIzBaze = _context.Kupci.Find(id);
            _context.Kupci.Remove(smjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }

    }
}