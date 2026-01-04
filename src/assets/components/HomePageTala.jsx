import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBarTala from "./NavBarTala";

function HomePageTala() {
  return (
    <>
       <NavBarTala />
      

      {/* HERO / FOOTBALL CLUB */}
      <section className="hero text-center py-5 bg-dark text-white">
        <h1>FOOTBALL CLUB</h1>
      </section>

      {/* NEWS + ULTIMO INCONTRO */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col xs={12} lg={8}>
              {/* <News /> */}
              <div className="box-placeholder">NEWS</div>
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