
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './NewsSecTala.css';

function NewsSecTala({ news, isFullPage = false, isAdmin = false, onDelete, onEdit }) {
  const [hoveredId, setHoveredId] = useState(null);

  const displayedNews = isFullPage ? news : news.slice(0, 6);

  const colConfig = isFullPage
    ? { xs: 12, sm: 6, md: 4, lg: 3 }
    : { xs: 12, sm: 6, md: 6, lg: 4 };

  return (
    <div className="news-section">
      
      <div className="news-header">
        <h2 className="news-title">
          {isFullPage ? 'Tutte le Notizie' : 'Ultime Notizie'}
        </h2>

        {!isFullPage && (
          <a href="/news" className="news-button">
            Vedi tutte →
          </a>
        )}
      </div>

      <Row className="g-3">
        {displayedNews.map((item) => (
          <Col key={item.id} {...colConfig}>
            <Card
              className={`news-card ${hoveredId === item.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              
              {/* IMAGE */}
              <div className="news-image-wrapper">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  className={`news-image ${hoveredId === item.id ? 'zoom' : ''}`}
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x300/e81d05/ffffff?text=US+TALAMONESE';
                  }}
                />

                {(!isAdmin || hoveredId !== item.id) && (
                  <div className="news-badge">
                    NEWS
                  </div>
                )}

                {isAdmin && (
                  <div className={`admin-overlay ${hoveredId === item.id ? 'visible' : ''}`}>
                    
                    <button
                      className="admin-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                    >
                      ✏️ Modifica
                    </button>

                    <button
                      className="admin-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Cancellare "${item.title}"?`)) {
                          onDelete(item.id);
                        }
                      }}
                    >
                      🗑️ Cancella
                    </button>

                  </div>
                )}
              </div>

              {/* BODY */}
              <Card.Body className="news-body">
                <Card.Title className="news-card-title">
                  {item.title}
                </Card.Title>

                <Card.Text className="news-card-text">
                  {item.description}
                </Card.Text>

                <div className="news-footer">
                  <small>{item.date || ''}</small>
                  <small className="news-read-more">
                    Leggi →
                  </small>
                </div>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>

      {displayedNews.length === 0 && (
        <div className="news-empty">
          <h4>Nessuna notizia disponibile</h4>
        </div>
      )}
    </div>
  );
}

export default NewsSecTala;
