using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingRezervacija : Mapping<Rezervacija, RezervacijaDTORead,RezervacijaDTOInsertUpdate>
    {

        public MappingRezervacija()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>{
                c.CreateMap<Rezervacija, RezervacijaDTORead>()
                .ConstructUsing(entitet =>
                 new RezervacijaDTORead(
                    entitet.Id,
                    entitet.Film,
                    entitet.Kupac,
                    entitet.Datum,
                    entitet.BrojSjedala));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>{
                    c.CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>();
                }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>{
                 c.CreateMap<Rezervacija, RezervacijaDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new RezervacijaDTOInsertUpdate(
                     entitet.Id,
                     entitet.Kupac == null ? null : entitet.Kupac,
                     entitet.Film == null ? null : entitet.Film,
                     entitet.Datum));
             }));
        }



    }
}
