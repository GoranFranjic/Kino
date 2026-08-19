import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import RezervacijaService from '../../services/RezervacijaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import useError from '../../hooks/useError';
import FilmService from '../../services/FilmService';
import KupacService from '../../services/KupacService';

export default function RezervacijePromijeni() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [filmovi, setFilmovi] = useState([]);
    const [filmId, setFilmId] = useState(0);
    const [kupci, setKupci] = useState([]);
    const [kupacId, setKupacId] = useState(0);
    const [rezervacija, setRezervacija] = useState({});
    const { prikaziError } = useError();

    async function dohvatiFilmove() {
      const odgovor = await FilmService.get();
      setFilmovi(odgovor);
      if (odgovor && odgovor.length > 0) {
        setFilmId(odgovor[0].id);
      }
    }

    async function dohvatiKupci() {
      const odgovor = await KupacService.get();
      setKupci(odgovor);
      if (odgovor && odgovor.length > 0) {
        setKupacId(odgovor[0].id);
      }
    }

    async function dohvatiRezervaciju() {
      const odgovor = await RezervacijaService.getById(routeParams.id);
      if (odgovor.greska) {
        prikaziError([{ svojstvo: 'Rezervacija', poruka: 'Ne mogu dohvatiti rezervaciju.' }]);
        return;
      }

      const podaci = odgovor.poruka;
      setRezervacija(podaci);
      setFilmId(podaci.filmId ?? 0);
      setKupacId(podaci.kupacId ?? 0);
    }

    async function ucitaj() {
      await dohvatiFilmove();
      await dohvatiKupci();
      await dohvatiRezervaciju();
    }

    useEffect(() => {
      ucitaj();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.id]);

    async function promjeni(rezervacija) {
        const odgovor = await RezervacijaService.put(routeParams.id, rezervacija);
        if (odgovor.greska) {
          prikaziError([{ svojstvo: 'Rezervacija', poruka: 'Greška prilikom promjene rezervacije.' }]);
          return;
        }
        navigate(RoutesNames.REZERVACIJA_PREGLED);
    }

    function handleSubmit(e) {
      e.preventDefault();

      const podaci = new FormData(e.target);

      if(podaci.get('datum') === '' && podaci.get('vrijeme') !== ''){
        alert('Ako postavljate vrijeme morate i datum');
        return;
      }

      let datum = null;
      if (podaci.get('datum') !== '') {
        if (podaci.get('vrijeme') !== '') {
          datum = moment.utc(podaci.get('datum') + ' ' + podaci.get('vrijeme'));
        } else {
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
              defaultValue={rezervacija.datum ? moment.utc(rezervacija.datum).format('YYYY-MM-DD') : ''}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='vrijeme'>
            <Form.Label>Vrijeme</Form.Label>
            <Form.Control
              type='time'
              name='vrijeme'
              defaultValue={rezervacija.datum ? moment.utc(rezervacija.datum).format('HH:mm') : ''}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='film'>
            <Form.Label>Film</Form.Label>
            <Form.Select
              onChange={(e) => { setFilmId(e.target.value); }}
              value={filmId || ''}
            >
              {filmovi && filmovi.map((s, index) => (
                <option key={index} value={s.id}>
                  {s.naziv}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='kupac'>
            <Form.Label>Kupac</Form.Label>
            <Form.Select
              onChange={(e) => { setKupacId(e.target.value); }}
              value={kupacId || ''}
            >
              {kupci && kupci.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.ime} {e.prezime}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <InputText atribut='broj_Sjedala' vrijednost={rezervacija.broj_Sjedala ?? ''} />
          <Akcije odustani={RoutesNames.REZERVACIJA_PREGLED} akcija='Promijeni' />
        </Form>
      </Container>
    );
}
