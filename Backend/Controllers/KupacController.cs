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
            try
            {
                return new JsonResult(_context.Kupci.ToList());
            }
            catch (Exception ex)
            {
                return new JsonResult(ex.ToString());
            }

        }

        [HttpPost]
        public IActionResult Post(int brojKupaca)
        {
            for (int i = 0; i < brojKupaca; i++)

            {
                var noviKupac = new Kupac
                {
                    Ime = Faker.Name.First(),
                    Prezime = Faker.Name.Last(),
                    Email = Faker.Internet.Email(),
                    Broj_telefona = Faker.Phone.Number()
            };

                _context.Kupci.Add(noviKupac);

            }
            _context.SaveChanges();
            return Ok("Dodani su" + brojKupaca + "novi kupci");
        }





        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Kupac kupac)
        {
            var smjerIzBaze = _context.Kupci.Find(sifra);
            // za sada ručno, kasnije će doći Mapper
            smjerIzBaze.Ime = kupac.Ime;
            smjerIzBaze.Prezime = kupac.Prezime;
            smjerIzBaze.Email = kupac.Email;
            smjerIzBaze.Broj_telefona = kupac.Broj_telefona;

            _context.Kupci.Update(smjerIzBaze);
            _context.SaveChanges();

            return new JsonResult(smjerIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerIzBaze = _context.Kupci.Find(sifra);
            _context.Kupci.Remove(smjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "Obrisano" });
        }

    }
}