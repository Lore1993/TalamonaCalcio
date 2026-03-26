import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../CSS/NavBarTala.css';

function NavBarTala() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar fixed="top" className="custom-navbar">
        <Container fluid className="px-4">
          
          {/* MOBILE: Logo + MENU (cliccabile) */}
          <div 
            className="mobile-menu-trigger d-lg-none" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src="/src/Scudetto.png" alt="Scudetto" height="40" />
            <span className="menu-label">MENU</span>
          </div>

          {/* DESKTOP: Link sinistra */}
          <Nav className="nav-left d-none d-lg-flex">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <Nav.Link href="/classifica">Classifica</Nav.Link>
          </Nav>

          {/* DESKTOP: Logo centrale */}
          <Navbar.Brand href="/" className="logo-center d-none d-lg-block">
            <img src="/src/Scudetto.png" alt="Scudetto" height="50" />
          </Navbar.Brand>

          {/* DESKTOP: Link destra */}
          <Nav className="nav-right d-none d-lg-flex">
            
            <Nav.Link href="/contatti">Contatti</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>

        </Container>

        {/* MOBILE: Menu a tendina */}
        {menuOpen && (
          <div className="mobile-dropdown d-lg-none">
            <Nav.Link href="/" onClick={() => setMenuOpen(false)}>Home</Nav.Link>
            <Nav.Link href="/news" onClick={() => setMenuOpen(false)}>News</Nav.Link>
            <Nav.Link href="/classifica" onClick={() => setMenuOpen(false)}>Classifica</Nav.Link>
            <Nav.Link href="/contatti" onClick={() => setMenuOpen(false)}>Contatti</Nav.Link>
            <Nav.Link href="/admin" onClick={() => setMenuOpen(false)}>Admin</Nav.Link>
          </div>
        )}
      </Navbar>

     
    </>
  );
}

export default NavBarTala;