import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KupacService from "../../services/KupacService";



export default function KupciDodaj(){
    const navigate = useNavigate();

    async function dodaj(kupac){
        const odgovor = await KupacService.post(kupac);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KUPAC_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem kupca');

        const podaci = new FormData(e.target);

        const smjer = {
            ime: podaci.get('ime'),  // 'naziv' je name atribut u Form.Control
            prezime: podaci.get('prezime'), //na backend je int
            email: podaci.get('email'),
            broj_telefona: podaci.get('broj_telefona')            
        };

        //console.log(smjer);
        dodaj(kupac);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>eMail</Form.Label>
                    <Form.Control type="text" name="email" />
                </Form.Group>

                <Form.Group controlId="broj_telefona">
                    <Form.Label>BrojTelefona</Form.Label>
                    <Form.Control type="text" name="broj_telefona" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.SMJER_PREGLED}>
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