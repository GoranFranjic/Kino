import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import RezervacijaService from '../../services/RezervacijaService';
import moment from 'moment';    


export default function Rezervacije() {
    const [rezervacije, setRezervacije] = useState();
    const navigate = useNavigate();


    async function dohvatiRezervacije() {
        await RezervacijaService.get()
            .then((odg) => {
                setRezervacije(odg);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        dohvatiRezervacije();
    }, []);

    async function obrisiAsync(id) {
        const odgovor = await RezervacijaService._delete(id);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiRezervacije();
    }

    function obrisi(id) {
        obrisiAsync(id);
    }

    function formatirajDatum(datum){
        let mdp = moment.utc(datum);
        if(mdp.hour()==0 && mdp.minutes()==0){
            return mdp.format('DD. MM. YYYY.');
        }
        return mdp.format('DD. MM. YYYY. HH:mm');
        
        }

    return (
        <>
            <Container>
            <Button variant='warning'>
                         <Link to={RoutesNames.REZERVACIJA_NOVI}> Unos nove rezervacije </Link>
            </Button>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Film</th>
                            <th>Kupac</th>
                            <th>Broj Sjedala</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rezervacije && typeof rezervacije === 'object' && Array.isArray(rezervacije) && rezervacije.map((rezervacija, index) => (
                            <tr key={index}>
                                <td>{rezervacija.filmNaziv}</td>
                                <td>{rezervacija.kupacImePrezime}</td>
                                <td>{rezervacija.broj_Sjedala}</td>
                                <td>

                                <p>
                                {rezervacija.datum==null 
                                ? 'Nije definirano'
                                :   
                                formatirajDatum(rezervacija.datum)
                                }
                                </p>
                                </td>

                            <td>
    <div style={{ marginBottom: '5px' }}>
        <Button
            onClick={() => obrisi(rezervacija.id)}
            variant='danger'
            style={{ width: '100%', marginBottom: '5px' }}
        >
            Obriši
        </Button>
    </div>
    <div>
        <Button
            onClick={() => navigate(`/rezervacije/${rezervacija.id}`)}
            style={{ width: '100%' }}
        >
            Promjeni
        </Button>
    </div>
</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}