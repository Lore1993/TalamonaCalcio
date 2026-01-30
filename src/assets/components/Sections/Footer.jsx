import React from "react";
import { Link } from "react-router-dom"; // se usi react-router

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 position-relative">
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        {/* Link centrati */}
        <div style={{ marginBottom: "1rem" }}>
          <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/news" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
            News
          </Link>
        
          <Link to="/contatti" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
            Contatti
          </Link>
          <Link to="/admin" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
            Admin
          </Link>
        </div>

        {/* Testo centrale */}
        <div style={{ marginBottom: "0.5rem" }}> <Link to="/" style={{ color: "white", margin: "0 1rem", textDecoration: "none" }}>
            © Talamonese Football Club
          </Link></div>

        {/* Firma in basso a destra */}
        <div style={{ position: "absolute", bottom: "0.5rem", right: "1rem", fontSize: "0.8rem", color: "#aaa" }}>
          Created by Lorenzo Pellegrini
        </div>
      </div>
    </footer>
  );
};

export default Footer;