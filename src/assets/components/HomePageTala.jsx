import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBarTala from "./NavBarTala";
import "../../CSS/HomePageT.css";
import NewsSecTala from "../../assets/components/Sections/NewsSecTala.jsx";
import Footer from "../../assets/components/Sections/Footer.jsx";
import UltimoIncontro from "./Sections/UltimoIncontro.jsx";
import ProssimaGiornata from "./Sections/ProssimaGiornata.jsx";
import { getEventi } from "../../API/Eventi.js";

function HomePageTala() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventi()
      .then(data => {
        setNews(data.map(e => ({
          id:          e.id,
          title:       e.titolo,
          description: e.descrizione,
          image:       e.immagineUrl,
          date:        e.data,
        })));
      })
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavBarTala />

      {/* HERO */}
      <section id="hero-section">
        <svg viewBox="0 0 1000 250" width="100%" height="auto" preserveAspectRatio="xMidYMid meet">
          <text x="500" y="70" textAnchor="middle" dominantBaseline="middle"
            fill="#e81d05" strokeWidth="3" fontSize="80" fontWeight="bold" letterSpacing="8" stroke="#333">
            US
          </text>
          <text x="500" y="150" textAnchor="middle" dominantBaseline="middle"
            fill="#e81d05" strokeWidth="3" fontSize="72" fontWeight="bold" letterSpacing="6" stroke="#333">
            TALAMONESE
          </text>
          <text x="500" y="210" textAnchor="middle" dominantBaseline="middle"
            fill="#e81d05" strokeWidth="2" fontSize="36" fontWeight="bold" letterSpacing="2" stroke="#333">
            since 1979
          </text>
        </svg>
      </section>

      {/* NEWS + ULTIMO INCONTRO */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col xs={12} lg={6}>
              {/* clickable=true → cliccando la card va a /articolo/:id */}
              <NewsSecTala news={news} isFullPage={false} clickable={true} loading={loading} />
            </Col>
            <Col xs={12} lg={6} className="d-flex flex-column justify-content-center gap-4">
              <div className="box-placeholder"><UltimoIncontro /></div>
              <div className="box-placeholder"><ProssimaGiornata /></div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default HomePageTala;