import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import FilmService from "../../services/FilmService";



export default function FilmoviDodaj(){
    const navigate = useNavigate();

    async function dodaj(film){
        const odgovor = await FilmService.post(film);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.FILM_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem film');

        const podaci = new FormData(e.target);

        const film = {
            naziv: podaci.get('naziv'),  // 'ime' je name atribut u Form.Control
            trajanje: podaci.get('trajanje'), //na backend je int
            dvorana: podaci.get('dvorana'),
        };

        //console.log(film);
        dodaj(film);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="text" name="trajanje" />
                </Form.Group>

                <Form.Group controlId="dvorana">
                    <Form.Label>Dvorana</Form.Label>
                    <Form.Control type="text" name="dvorana" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.FILM_PREGLED}>
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