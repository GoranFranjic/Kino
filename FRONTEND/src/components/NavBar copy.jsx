import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { App, RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';


export default function NavBar(){

    const navigate = useNavigate();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand 
                className='kursor'
                onClick={()=>navigate(RoutesNames.HOME)}
                >Edunova APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link 
                    href={App.URL + '/swagger/index.html'}
                    target='_blank'>API</Nav.Link>
                    
                    <NavDropdown title="Programi" id="collapsible-nav-dropdown">
                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.SMJER_PREGLED)}
                    >Smjerovi</NavDropdown.Item>
                     <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.PREDAVAC_PREGLED)}
                  >
                    Predavači
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.POLAZNIK_PREGLED)}
                  >
                    Polaznici
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                  onClick={()=>navigate(RoutesNames.GRUPA_PREGLED)}
                  >
                    Grupe
                  </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}