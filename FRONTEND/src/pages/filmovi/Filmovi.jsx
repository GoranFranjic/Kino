import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import FilmService from '../../services/FilmService';


export default function Filmovi() {
    const [filmovi, setFilmovi] = useState();
    const navigate = useNavigate();


    async function dohvatiFilmove() {
        await FilmService.get()
            .then((odg) => {
                setFilmovi(odg);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        dohvatiFilmove();
    }, []);

    async function obrisiAsync(id) {
        const odgovor = await FilmService._delete(id);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiFilmove();
    }

    function obrisi(id) {
        obrisiAsync(id);
    }

    return (
        <>
            <Container>
            <Button variant='warning'>
                         <Link to={RoutesNames.FILM_NOVI}> Unos novog filma </Link>
            </Button>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>naziv</th>
                            <th>trajanje</th>
                            <th>dvorana</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filmovi && typeof filmovi === 'object' && Array.isArray(filmovi) && filmovi.map((film, index) => (
                            <tr key={index}>
                                <td>{film.naziv}</td>
                                <td>{film.trajanje}</td>
                                <td>{film.dvorana}</td>
                            <td>
    <div style={{ marginBottom: '5px' }}>
        <Button
            onClick={() => obrisi(film.id)}
            variant='danger'
            style={{ width: '100%', marginBottom: '5px' }}
        >
            Obriši
        </Button>
    </div>
    <div>
        <Button
            onClick={() => navigate(`/filmovi/${film.id}`)}
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