import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import RezervacijaService from "../../services/RezervacijaService";



export default function RezervacijeDodaj(){
    const navigate = useNavigate();

    async function dodaj(rezervacija){
        const odgovor = await RezervacijaService.post(rezervacija);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.REZERVACIJA_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem');

        const podaci = new FormData(e.target);

        const rezervacija = {
            filmNaziv: podaci.get('filmId'),  // 'ime' je name atribut u Form.Control
            kupacImePrezime: podaci.get('kupacId'), //na backend je int
            broj_Sjedala: podaci.get('broj_Sjedala'),
            datum: podaci.get('datum'),
        };

        //console.log(rezervacija);
        dodaj(rezervacija);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="filmId">
                    <Form.Label>Film</Form.Label>
                    <Form.Control type="text" name="filmId" required />
                </Form.Group>

                <Form.Group controlId="kupacId">
                    <Form.Label>Kupac</Form.Label>
                    <Form.Control type="text" name="kupacId" />
                </Form.Group>

                <Form.Group controlId="broj_Sjedala">
                    <Form.Label>BrojSjedala</Form.Label>
                    <Form.Control type="text" name="broj_Sjedala" />
                </Form.Group>

                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="text" name="datum" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.REZERVACIJA_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}