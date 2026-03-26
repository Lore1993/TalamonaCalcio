import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../../../CSS/NewsSecTala.css';

function NewsSecTala({
  news,
  isFullPage = false,
  isAdmin = false,
  clickable = false,
  loading = false,
  onDelete
}) {
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const skeletonCount = isFullPage ? 8 : 6;

  if (loading) {
    return (
      <div className="news-section">
        <div className="news-header">
          <h2 className="news-title">{isFullPage ? 'Tutte le Notizie' : 'Ultime Notizie'}</h2>
        </div>
        <Row className="g-3">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Col key={i} xs={12} sm={6} md={isFullPage ? 4 : 6} lg={isFullPage ? 3 : 4}>
              <div className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line short" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  const displayedNews = isFullPage ? news : news.slice(0, 6);

  const colConfig = isFullPage
    ? { xs: 12, sm: 6, md: 4, lg: 3 }
    : { xs: 12, sm: 6, md: 6, lg: 4 };

  const handleCardClick = (item) => {
    if (isAdmin) return;
    if (clickable) navigate(`/articolo/${item.id}`);
  };

  return (
    <div className="news-section">

      <div className="news-header">
        <h2 className="news-title">
          {isFullPage ? 'Tutte le Notizie' : 'Ultime Notizie'}
        </h2>
        {!isFullPage && (
          <a href="/news" className="news-button">Vedi tutte →</a>
        )}
      </div>

      <Row className="g-3">
        {displayedNews.map((item) => (
          <Col key={item.id} {...colConfig}>
            <Card
              className={`news-card ${hoveredId === item.id ? 'hovered' : ''}`}
              style={{ cursor: (clickable && !isAdmin) ? 'pointer' : 'default' }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(item)}
            >
              <div className="news-image-wrapper">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.title}
                  className={`news-image ${hoveredId === item.id ? 'zoom' : ''}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e81d05'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='20' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3EUS TALAMONESE%3C/text%3E%3C/svg%3E";
                  }}
                />

                {/* Badge NEWS — sparisce solo quando overlay admin è visibile */}
                {(!isAdmin || hoveredId !== item.id) && (
                  <div className="news-badge">NEWS</div>
                )}

                {/* OVERLAY ADMIN — solo pulsante cancella */}
                {isAdmin && (
                  <div className={`admin-overlay ${hoveredId === item.id ? 'visible' : ''}`}>
                    <button
                      className="admin-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Cancellare "${item.title}"?`)) onDelete(item.id);
                      }}
                    >
                      🗑️ Cancella
                    </button>
                  </div>
                )}
              </div>

              <Card.Body className="news-body">
                <Card.Title className="news-card-title">{item.title}</Card.Title>
                <Card.Text className="news-card-text">{item.description}</Card.Text>
                <div className="news-footer">
                  <small>{item.date || ''}</small>
                  <small className="news-read-more">Leggi →</small>
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