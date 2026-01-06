import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBarTala from "./NavBarTala";
import "../../CSS/HomePageT.css";
import NewsSecTala from "../../assets/components/Sections/NewsSecTala.jsx";

function HomePageTala() {
  
const news = [
    {
      id: 1,
      title: "Vittoria importante",
      description: "Grande prestazione della squadra.",
      image: "https://via.placeholder.com/400x250",
    },
    {
      id: 2,
      title: "Nuovo allenatore",
      description: "Presentato il nuovo mister.",
      image: "https://via.placeholder.com/400x250",
    },
    {
      id: 3,
      title: "Settore giovanile",
      description: "Risultati del weekend.",
      image: "https://via.placeholder.com/400x250",
    },
    {
      id: 4,
      title: "Allenamento speciale",
      description: "Sessione aperta al pubblico.",
      image: "https://via.placeholder.com/400x250",
    },
    {
      id: 5,
      title: "Nuove divise",
      description: "Presentazione ufficiale.",
      image: "https://via.placeholder.com/400x250",
    },
    {
      id: 6,
      title: "Evento sociale",
      description: "Cena di squadra.",
      image: "https://via.placeholder.com/400x250",
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
    stroke="white"
    strokeWidth="3"
    fontSize="80"
    fontWeight="bold"
    letterSpacing="8"
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
    stroke="white"
    strokeWidth="3"
    fontSize="72"
    fontWeight="bold"
    letterSpacing="6"
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
    stroke="white"
    strokeWidth="2"
    fontSize="36"
    fontWeight="bold"
    letterSpacing="2"
  >
    since 1979
  </text>
</svg>
      </section>

      {/* NEWS + ULTIMO INCONTRO */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col xs={12} lg={8}>
              {/* <News /> */}
              <NewsSecTala news={news} />
            </Col>

            <Col xs={12} lg={4}>
              {/* <UltimoIncontro /> */}
              <div className="box-placeholder">ULTIMO INCONTRO</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CLASSIFICA / GIORNATA / MARCATORI */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col xs={12} lg={4}>
              {/* <Classifica /> */}
              <div className="box-placeholder">CLASSIFICA</div>
            </Col>

            <Col xs={12} lg={4}>
              {/* <Giornata /> */}
              <div className="box-placeholder">GIORNATA</div>
            </Col>

            <Col xs={12} lg={4}>
              {/* <Marcatori /> */}
              <div className="box-placeholder">MARCATORI</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4">
        {/* <Footer /> */}
        © Football Club
      </footer>
    </>
  );
}

export default HomePageTala;