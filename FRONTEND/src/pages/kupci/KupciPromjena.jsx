import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KupacService from "../../services/KupacService";
import { useEffect, useState } from "react";

export default function KupciPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [kupac, setKupac] = useState({});

    async function dohvatiKupac() {
        const o = await KupacService.getById(routeParams.id);
        if (o.greska) {
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setKupac(o);
    }

    async function promjeni(kupac) {
        const odgovor = await KupacService.put(routeParams.id, kupac);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KUPAC_PREGLED);
    }

    useEffect(() => {
        dohvatiKupac();
    }, []);

    function obradiSubmit(e) {
        e.preventDefault();
        
        const podaci = new FormData(e.target);

        const noviKupac = {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email'),
            broj_telefona: podaci.get('broj_telefona')
        };

        promjeni(noviKupac);
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" defaultValue={kupac.ime} required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" defaultValue={kupac.prezime} required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>eMail</Form.Label>
                    <Form.Control type="text" name="email" defaultValue={kupac.email} required />
                </Form.Group>

                <Form.Group controlId="broj_telefona">
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control type="text" name="broj_telefona" defaultValue={kupac.broj_telefona} required />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KUPAC_PREGLED}>
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
