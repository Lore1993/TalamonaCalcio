import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBarTala from "./NavBarTala";
import "../../CSS/HomePageT.css";
import NewsSecTala from "../../assets/components/Sections/NewsSecTala.jsx";
import Footer from "../../assets/components/Sections/Footer.jsx";
import UltimoIncontro from "./Sections/UltimoIncontro.jsx";
import ProssimaGiornata from "./Sections/ProssimaGiornata.jsx";
function HomePageTala() {
  
const news = [
    {
      id: 1,
      title: "Vittoria importante",
      description: "Grande prestazione della squadra.",
      image: "https://lorempics.com/200x300",
    },
    {
      id: 2,
      title: "Nuovo allenatore",
      description: "Presentato il nuovo mister.",
      image: "https://lorempics.com/200x300",
    },
    {
      id: 3,
      title: "Settore giovanile",
      description: "Risultati del weekend.",
     image: "https://lorempics.com/200x300",
    },
    {
      id: 4,
      title: "Allenamento speciale",
      description: "Sessione aperta al pubblico.",
      image: "https://lorempics.com/200x300",
    },
    {
      id: 5,
      title: "Nuove divise",
      description: "Presentazione ufficiale.",
      image: "https://lorempics.com/200x300",
    },
    {
      id: 6,
      title: "Evento sociale",
      description: "Cena di squadra.",
      image: "https://lorempics.com/200x300",
    },
  ];

  return (
    <>
       <NavBarTala />
      

      {/* HERO / FOOTBALL CLUB */}
      <section id="hero-section" >
        <svg
  viewBox="0 0 1000 250"
  width="100%"
  height="auto"
  preserveAspectRatio="xMidYMid meet"
>
 US 
  <text
    x="500"
    y="70"
    textAnchor="middle"
    dominantBaseline="middle"
    fill="#e81d05"
    strokeWidth="3"
    fontSize="80"
    fontWeight="bold"
    letterSpacing="8"
    stroke="#333"
  >
    US
  </text>
  
  TALAMONESE
  <text
    x="500"
    y="150"
    textAnchor="middle"
    dominantBaseline="middle"
    fill="#e81d05" 
    strokeWidth="3"
    fontSize="72"
    fontWeight="bold"
    letterSpacing="6"
    stroke="#333"
  >
    TALAMONESE
  </text>
  
 since 1979 
  <text
    x="500"
    y="210"
    textAnchor="middle"
    dominantBaseline="middle"
    fill="#e81d05"
    strokeWidth="2"
    fontSize="36"
    fontWeight="bold"
    letterSpacing="2"
    stroke="#333"
  >
    since 1979
  </text>
</svg>
      </section>

      {/* NEWS + ULTIMO INCONTRO */}
     <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
           
            <Col xs={12} lg={6}>
              <NewsSecTala news={news} isFullPage={false} clickable={true} />
            </Col>

            {/* COLONNA ULTIMO INCONTRO - 4/12 colonne */}
            <Col xs={12} lg={6}  className="d-flex flex-column justify-content-center gap-4">
             <div className="box-placeholder">
  <UltimoIncontro />
</div>
<div className="box-placeholder">
  <ProssimaGiornata />
</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER */}
     <Footer />
    </>
  );
}

export default HomePageTala;