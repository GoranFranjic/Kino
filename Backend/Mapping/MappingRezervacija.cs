﻿using AutoMapper;
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
                    entitet.BrojSjedala,
                    entitet.Datum));
        }));

            MapperMapInsertUpdatedFromDTO = new Mapper(new MapperConfiguration(c =>{
                    c.CreateMap<RezervacijaDTOInsertUpdate, Rezervacija>();
                }));

            MapperMapInsertUpdateToDTO = new Mapper(new MapperConfiguration(c =>{
                 c.CreateMap<Rezervacija, RezervacijaDTOInsertUpdate>()
                 .ConstructUsing(entitet =>
                  new RezervacijaDTOInsertUpdate(
                     entitet.Id,
                     entitet.Film,
                     entitet.Datum,
                     entitet.Kupac));
             }));
        }



    }
}
