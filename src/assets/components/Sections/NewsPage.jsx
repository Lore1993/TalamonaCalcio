import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import NavBarTala from "../NavBarTala.jsx"; 
import "../../../CSS/NewsPage.css"; // CSS dedicato
import Footer from "./Footer";

function NewsPage() {
  const allNews = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Notizia ${i + 1}`,
    description: `Descrizione breve della notizia numero ${i + 1}.`,
    image: `https://via.placeholder.com/400x300/e81d05/ffffff?text=News+${i + 1}`,
    date: `28 Gen 2026`,
  }));

  const NEWS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const endIndex = startIndex + NEWS_PER_PAGE;
  const displayedNews = allNews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allNews.length / NEWS_PER_PAGE);
  const colConfig = { xs: 12, md: 6, lg: 4 };

  return (
    <>
      <NavBarTala />

      {/* Cornice laterale e titolo verde */}
      <Container fluid className="news-page mt-4
      
      ">
        <Row>
          {/* Colonna sinistra verde */}
          <Col xs={2} className="bg-green-side"></Col>

          {/* Colonna centrale */}
          <Col xs={8}>
            {/* Titolo con sfondo verde */}
            <div className="title-green p-3 mb-4">
              <h1 className="news-title">TALAMONESE NEWS ed EVENTI</h1>
            </div>

            {/* Grid notizie */}
            <Row className="g-4">
              {displayedNews.map((item) => (
                <Col key={item.id} {...colConfig}>
                  <Card className="news-card">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300/e81d05/ffffff?text=US+TALAMONESE";
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="card-title">{item.title}</Card.Title>
                      <Card.Text className="card-text">{item.description}</Card.Text>
                      <div className="card-footer">
                        <small className="text-muted">{item.date}</small>
                        <small className="text-danger">Leggi →</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Paginazione */}
            <div className="pagination-wrapper">
              <span>
                Pagina {currentPage} di {totalPages}
              </span>
              <div className="btn-group">
                <button
                  className="btn btn-outline-danger"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ← Precedente
                </button>
                <button
                  className="btn btn-outline-danger"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Successiva →
                </button>
              </div>
            </div>
          </Col>

          {/* Colonna destra verde */}
          <Col xs={2} className="bg-green-side"></Col>
        </Row>

        {/* Footer verde sopra il footer principale */}
        <div className="footer-green text-center">
          <h1>© 2026 US Talamonese - All rights reserved</h1>  
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default NewsPage;



