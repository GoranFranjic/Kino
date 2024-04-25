import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import FilmService from "../../services/FilmService";
import { useEffect, useState } from "react";

export default function FilmoviPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [film, setFilm] = useState({});

    async function dohvatiFilm() {
        const o = await FilmService.getById(routeParams.id);
        if (o.greska) {
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setFilm(o.poruka);
    }

    async function promjeni(film) {
        const odgovor = await FilmService.put(routeParams.id, film);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.FILM_PREGLED);
    }

    useEffect(() => {
        dohvatiFilm();
    }, []);

    function obradiSubmit(e) {
        e.preventDefault();
        
        const podaci = new FormData(e.target);

        const noviFilm = {
            naziv: podaci.get('naziv'),
            trajanje: podaci.get('trajanje'),
            dvorana: podaci.get('dvorana'),
    };

        promjeni(noviFilm);
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" defaultValue={film.naziv} required />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="text" name="trajanje" defaultValue={film.trajanje} required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Dvorana</Form.Label>
                    <Form.Control type="text" name="dvorana" defaultValue={film.dvorana} required />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.FILM_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
