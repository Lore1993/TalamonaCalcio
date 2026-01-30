
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function NewsSecTala({ news, isFullPage = false }) {
  const [hoveredId, setHoveredId] = useState(null);

  // Se siamo in homepage, mostra solo le prime 6 notizie
  const displayedNews = isFullPage ? news : news.slice(0, 6);

  // Configurazione colonne responsive
  // Homepage: 3 per riga desktop, 2 tablet, 1 mobile
  // Pagina News: 4 per riga desktop, 3 tablet, 2 mobile
  const colConfig = isFullPage
    ? { xs: 12, sm: 6, md: 4, lg: 3 } 
    : { xs: 12, sm: 6, md: 6, lg: 4 };

  return (
    <div className="news-section">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-danger mb-0">
          {isFullPage ? 'Tutte le Notizie' : 'Ultime Notizie'}
        </h2>
        {!isFullPage && (
          <a 
            href="/news" 
            className="btn btn-outline-danger"
          >
            Vedi tutte →
          </a>
        )}
      </div>

      {/* Grid Notizie */}
      <Row className="g-3">
        {displayedNews.map((item) => (
          <Col key={item.id} {...colConfig}>
            <Card
              className="h-100 border-0 shadow-sm"
              style={{
                cursor: 'pointer',
                transform: hoveredId === item.id ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                boxShadow: hoveredId === item.id 
                  ? '0 8px 16px rgba(232, 29, 5, 0.2)' 
                  : '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Immagine */}
              <div 
                style={{
                  height: isFullPage ? '200px' : '180px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: hoveredId === item.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/e81d05/ffffff?text=US+TALAMONESE';
                  }}
                />
                
                {/* Badge NEWS */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#e81d05',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  NEWS
                </div>
              </div>

              {/* Contenuto */}
              <Card.Body className="d-flex flex-column">
                <Card.Title 
                  className="fw-bold mb-2"
                  style={{
                    fontSize: '1.1rem',
                    color: hoveredId === item.id ? '#e81d05' : '#333',
                    transition: 'color 0.3s ease',
                    lineHeight: '1.3'
                  }}
                >
                  {item.title}
                </Card.Title>
                
                <Card.Text 
                  className="text-muted flex-grow-1"
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}
                >
                  {item.description}
                </Card.Text>

                {/* Footer card */}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <small className="text-muted">
                    {item.date || '28 Gen 2026'}
                  </small>
                  <small 
                    className="text-danger fw-bold"
                    style={{
                      opacity: hoveredId === item.id ? 1 : 0.7,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    Leggi →
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Messaggio se non ci sono notizie */}
      {displayedNews.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">Nessuna notizia disponibile</h4>
        </div>
      )}
    </div>
  );
}

export default NewsSecTala;