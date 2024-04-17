using AutoMapper;
using Backend.Models;

namespace Backend.Mappers
{
    public class MappingFilm : Mapping<Film, FilmDTORead, FilmDTOInsertUpdate>
    {

        public MappingFilm()
        {
            MapperMapReadToDTO = new Mapper(new MapperConfiguration(c =>{
                c.CreateMap<Film, FilmDTORead>()
                .ConstructUsing(entitet =>
                 new FilmDTORead(
                    entitet.Id,
                    entitet.Naziv,
                    entitet.Trajanje,
                    entitet.Dvorana)); ;
            }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>{
                    c.CreateMap<FilmDTOInsertUpdate, Film>();
                }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>{
                 c.CreateMap<Film, FilmDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new FilmDTOInsertUpdate(
                     entitet.Naziv,
                     entitet.Trajanje,
                     entitet.Dvorana));
            }));
        }



    }
}
