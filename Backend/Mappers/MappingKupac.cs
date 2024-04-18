using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingKupac : Mapping<Kupac, KupacDTORead, KupacDTOInsertUpdate>
    {

        public MappingKupac()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>{
                c.CreateMap<Kupac, KupacDTORead>()
                .ConstructUsing(entitet =>
                 new KupacDTORead(
                    entitet.Id,
                    entitet.Ime,
                    entitet.Prezime,
                    entitet.Email,
                    entitet.Broj_telefona));
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>{
                    c.CreateMap<KupacDTOInsertUpdate, Kupac>();
                }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>{
                 c.CreateMap<Kupac, KupacDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new KupacDTOInsertUpdate(
                    entitet.Ime,
                    entitet.Prezime,
                    entitet.Email,
                    entitet.Broj_telefona));
            }));
        }



    }
}
