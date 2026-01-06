import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


function NewsSecTala({ news }) {
  return (
    <section className="news-section py-4">
        
      <Container>
        {/* TITOLO */}
        <h2 className="news-title mb-4">
          <Link to="/news">News & Eventi</Link>
        </h2>

        {/* CARD */}
        <Row className="g-4">
          {news.slice(0, 6).map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
   
  );
}

export default NewsSecTala;