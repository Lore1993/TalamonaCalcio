import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../../CSS/NavBarTala.css";

function NavBarTala() {
      const [expanded, setExpanded] = useState(false);
  return (
  <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        bg="white" 
        className="shadow-sm"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container fluid className="px-4">
          {/* Logo a sinistra su mobile, centro su desktop */}
          <Navbar.Brand href="/" className="navbar-brand-custom">
            <img
              src="src/Scudetto.png"
              alt="Scudetto"
              height="50"
            />
          </Navbar.Brand>

          {/* Bottone hamburger */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            {/* Link sinistra */}
            <Nav className="me-auto nav-left-custom">
              <Nav.Link href="/" className="nav-link-custom active">
                Home
              </Nav.Link>
              <Nav.Link href="#news" className="nav-link-custom">
                News
              </Nav.Link>
              <Nav.Link href="#calendario" className="nav-link-custom">
                Calendario
              </Nav.Link>
            </Nav>

            {/* Link destra */}
            <Nav className="ms-auto nav-right-custom">
              <Nav.Link href="#tesseramento" className="nav-link-custom">
                Tesseramento
              </Nav.Link>
              <Nav.Link href="#contatti" className="nav-link-custom">
                Contatti
              </Nav.Link>
              <Nav.Link href="#Admin" className="nav-link-custom">
                Admin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer per compensare la navbar fixed */}
      <div style={{ height: '70px' }}></div>
    </>
  );
}

export default NavBarTala;