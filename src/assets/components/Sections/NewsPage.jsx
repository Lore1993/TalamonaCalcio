import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarTala from '../NavBarTala.jsx';
import '../../../CSS/NewsPage.css';
import Footer from './Footer';
import NewsSecTala from './NewsSecTala.jsx';
import { getEventi, cancellaEvento } from '../../../API/Eventi.js';

function tokenValido() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch { return false; }
}

export default function NewsPage() {
  const [allNews, setAllNews]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [errore, setErrore]       = useState('');
  const [isAdmin, setIsAdmin]     = useState(tokenValido);
  const NEWS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);

  const caricaEventi = () => {
    setLoading(true);
    getEventi()
      .then(data => {
        setAllNews(data.map(e => ({
          id:           e.id,
          title:        e.titolo,
          description:  e.descrizione,
          image:        e.immagineUrl,
          date:         e.data,
        })));
        setErrore('');
      })
      .catch(() => setErrore('Impossibile caricare gli eventi.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    caricaEventi();
    const interval = setInterval(() => {
      if (!tokenValido()) setIsAdmin(false);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      await cancellaEvento(id);
      caricaEventi();
    } catch {
      alert('Errore durante la cancellazione');
    }
  };

  const startIndex    = (currentPage - 1) * NEWS_PER_PAGE;
  const displayedNews = allNews.slice(startIndex, startIndex + NEWS_PER_PAGE);
  const totalPages    = Math.ceil(allNews.length / NEWS_PER_PAGE);

  return (
    <>
      <NavBarTala />

      <Container fluid className="news-page mt-4">
        <Row>
          <Col xs={2} className="bg-green-side" />

          <Col xs={8}>
            <div className="title-green p-3 mb-4 d-flex justify-content-between align-items-center">
              <h1 className="news-title mb-0">TALAMONESE NEWS ed EVENTI</h1>
              {isAdmin && <span className="admin-badge">🔓 modalità admin</span>}
            </div>

            {loading ? (
              <div className="text-center py-5">
                <p className="text-muted">Caricamento eventi...</p>
              </div>
            ) : errore ? (
              <div className="text-center py-5">
                <p className="text-danger">{errore}</p>
              </div>
            ) : (
              <>
                <NewsSecTala
                  news={displayedNews}
                  isFullPage={true}
                  isAdmin={isAdmin}
                  clickable={true}
                  onDelete={handleDelete}
                />

                <div className="pagination-wrapper">
                  <span>Pagina {currentPage} di {totalPages}</span>
                  <div className="btn-group">
                    <button className="btn btn-outline-danger" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                      ← Precedente
                    </button>
                    <button className="btn btn-outline-danger" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                      Successiva →
                    </button>
                  </div>
                </div>
              </>
            )}
          </Col>

          <Col xs={2} className="bg-green-side" />
        </Row>

        <div className="footer-green text-center">
          <h1>© 2026 US Talamonese - All rights reserved</h1>
        </div>
      </Container>

      <Footer />
    </>
  );
}