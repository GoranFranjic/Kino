import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand className="me-auto">
                    <Button variant="link" className="navbar-brand" onClick={() => navigate(RoutesNames.HOME)}>SINEMAKS</Button>
                
                    <Button variant="warning" className="me-2" onClick={() => navigate(RoutesNames.KUPAC_PREGLED)}>Kupci</Button>
                    <Button variant="warning" className="me-2" onClick={() => navigate(RoutesNames.FILM_PREGLED)}>Filmovi</Button>
                    <Button variant="warning" className="me-2" onClick={() => navigate(RoutesNames.REZERVACIJA_PREGLED)}>Rezervacije</Button>
                </Navbar.Brand>
                <Button variant="outline-warning" href="https://goranf.runasp.net/swagger/index.html" target="_blank">API</Button>
            </Container>
        </Navbar>
    );
}
