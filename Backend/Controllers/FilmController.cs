﻿using Backend.Data;
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
            return new JsonResult(_context.Filmovi.ToList());
        }

        [HttpPost]
        public IActionResult Post(Film smjer)
        {
            _context.Filmovi.Add(smjer);
            _context.SaveChanges();
            return new JsonResult(smjer);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Film smjer)
        {
            var smjerIzBaze = _context.Filmovi.Find(sifra);
            // za sada ručno, kasnije će doći Mapper
            smjerIzBaze.Naziv = smjer.Naziv;
            smjerIzBaze.Trajanje= smjer.Trajanje;
            smjerIzBaze.Dvorana= smjer.Dvorana;
            

            _context.Filmovi.Update(smjerIzBaze);
            _context.SaveChanges();

            return new JsonResult(smjerIzBaze);
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var smjerIzBaze = _context.Filmovi.Find(sifra);
            _context.Filmovi.Remove(smjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka="Obrisano"});
        }

    }
}
