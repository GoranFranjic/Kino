using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingRezervacija : Mapping<Rezervacija, RezervacijaDTORead, RezervacijaDTOInsertUpdate>
    {

        public MappingRezervacija()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Rezervacija, RezervacijaDTORead>()
                .ConstructUsing(entitet =>
                 new RezervacijaDTORead(
                    entitet.Id,
                    entitet.Film.Naziv,
                    entitet.Kupac.Ime + " " + entitet.Kupac.Prezime,
                    entitet.Broj_Sjedala,
                    entitet.Datum));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>();
            }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c => {
                c.CreateMap<Rezervacija, RezervacijaDTOInsertUpdate>()
                .ConstructUsing(entitet =>
                 new RezervacijaDTOInsertUpdate(
                    entitet.Film.Id,
                    entitet.Kupac.Id,
                    entitet.Broj_Sjedala,
                    entitet.Datum));
            }));
        }



    }
}
