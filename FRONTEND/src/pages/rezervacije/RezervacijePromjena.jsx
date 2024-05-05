import { useState, useEffect, useRef } from 'react';
import { Container, Form, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Service from '../../services/RezervacijaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import useError from "../../hooks/useError";
import FilmService from "../../services/FilmService";
import KupacService from "../../services/KupacService";
//import useLoading from "../../hooks/useLoading";

export default function RezervacijePromijeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [filmovi, setFilmovi] = useState([]);
    const [filmId, setFilmId] = useState(0);
  
    const [kupci, setKupci] = useState([]);
    const [kupacId, setKupacId] = useState(0);
    const { prikaziError } = useError();
    //const { showLoading, hideLoading } = useLoading();
    
  
    async function dohvatiFilmove(){
      const odgovor = await FilmService.get();
      
      setFilmovi(odgovor);
      setFilmId(odgovor[0].id);
    }
  
    async function dohvatiKupci(){
      const odgovor = await KupacService.get();
      
      setKupci(odgovor);
      setKupacId(odgovor[0].id);
    }
  
    async function ucitaj(){
      //showLoading();
      await dohvatiFilmove();
      await dohvatiKupci();
      //hideLoading();
    }
  
    useEffect(()=>{
      ucitaj();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    async function promjeni(e) {
        //showLoading();
        const odgovor = await Service.promjeni('Rezervacija',routeParams.sifra, e);
        hideLoading();
        if(odgovor.ok){
          navigate(RoutesNames.REZERVACIJA_PREGLED);
          return;
        }
        prikaziError(odgovor.podaci);
      }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const podaci = new FormData(e.target);
  
      if(podaci.get('datum')=='' && podaci.get('vrijeme')!=''){
        alert('Ako postavljate vrijeme morate i datum');
        return;
      }
      let datum=null;
      if(podaci.get('datum')!=''){
        if (podaci.get('vrijeme')!=''){
          datum = moment.utc(podaci.get('datum') + ' ' + podaci.get('vrijeme'));
        }else{
          datum = moment.utc(podaci.get('datum'));
        }
        
      }

    promjeni({
     datum: datum,
      filmId: parseInt(filmId),
      kupacId: parseInt(kupacId),
      broj_Sjedala: parseInt(podaci.get('broj_Sjedala'))
    });
  }

  return (
    <Container className='mt-4'>
    <Form onSubmit={handleSubmit}>

     

      <Form.Group className='mb-3' controlId='datum'>
        <Form.Label>Datum</Form.Label>
        <Form.Control
          type='date'
          name='datum'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='vrijeme'>
        <Form.Label>Vrijeme</Form.Label>
        <Form.Control
          type='time'
          name='vrijeme'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='film'>
        <Form.Label>Film</Form.Label>
        <Form.Select multiple={true}
        onChange={(e)=>{setFilmId(e.target.value)}}
        >
        {filmovi && filmovi.map((s,index)=>(
          <option key={index} value={s.id}>
            {s.naziv}
          </option>
        ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className='mb-3' controlId='kupac'>
        <Form.Label>Kupac</Form.Label>
        <Form.Select
        onChange={(e)=>{setKupacId(e.target.value)}}
        >
        {kupci && kupci.map((e,index)=>(
          <option key={index} value={e.id}>
            {e.ime} {e.prezime}
          </option>
        ))}
        </Form.Select>
      </Form.Group>
      <InputText atribut='broj_Sjedala' vrijednost='' />
        <Akcije odustani={RoutesNames.REZERVACIJA_PREGLED} akcija='Promijeni' /> 
      </Form>
    </Container>
  );
}
