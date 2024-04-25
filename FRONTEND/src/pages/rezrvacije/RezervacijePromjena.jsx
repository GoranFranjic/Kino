import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RezervacijaService from "../../services/RezervacijaService";
import { useEffect, useState } from "react";

export default function RezervacijePromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [rezervacija, setRezervacija] = useState({});

    async function dohvatiRezervacija() {
        const o = await RezervacijaService.getById(routeParams.id);
        if (o.greska) {
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setRezervacija(o.poruka);
    }

    async function promjeni(rezervacija) {
        const odgovor = await RezervacijaService.put(routeParams.id, rezervacija);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.FREZERVACIJA_PREGLED);
    }

    useEffect(() => {
        dohvatiRezervacija();
    }, []);

    function obradiSubmit(e) {
        e.preventDefault();
        
        const podaci = new FormData(e.target);

        const noviRezervacija = {
            filmId: podaci.get('filmId'),
            kupacId: podaci.get('kupacId'),
            broj_Sjedala: podaci.get('broj_Sjedala'),
            datum: podaci.get('datum'),
    };

        promjeni(noviRezervacija);
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="filmId">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="filmId" defaultValue={rezervacija.filmId} required />
                </Form.Group>

                <Form.Group controlId="kupacId">
                    <Form.Label>Kupac</Form.Label>
                    <Form.Control type="text" name="kupacId" defaultValue={rezervacija.kupacId} required />
                </Form.Group>

                <Form.Group controlId="broj_Sjedala">
                    <Form.Label>BrojSjedala</Form.Label>
                    <Form.Control type="text" name="broj_Sjedala" defaultValue={rezervacija.broj_Sjedala} required />
                </Form.Group>

                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="text" name="datum" defaultValue={rezervacija.datum} required />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.REZERVACIJA_PREGLED}>
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
