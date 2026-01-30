import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../CSS/Classifica.css";
import NavBarTala from "../NavBarTala.jsx";
import Footer from "./Footer";

const Classifica = () => {
  return (
    <>
      <NavBarTala />
    <section className="classifica-page-section mt-5 py-5 bg-light">
      <Container>
        <Row className="g-4">
          {/* Colonna Classifica */}
          <Col xs={12} lg={7}>
            <div className="classifica-card">
              <h2 className="card-title">Classifica</h2>
              <iframe
                src="https://www.tuttocampo.it/WidgetV2/Classifica/3e7ccc1d-d64b-406f-8b08-b9b7c2f5a379"
                title="Classifica"
                loading="lazy"
              ></iframe>
            </div>
          </Col>

          {/* Colonna Marcatori */}
          <Col xs={12} lg={5}>
            <div className="marcatori-card">
              <h2 className="card-title">Marcatori</h2>
              <iframe
                src="https://www.tuttocampo.it/WidgetV2/Marcatori/3e7ccc1d-d64b-406f-8b08-b9b7c2f5a379"
                title="Marcatori"
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Footer />
    </>
  );
};

export default Classifica;
