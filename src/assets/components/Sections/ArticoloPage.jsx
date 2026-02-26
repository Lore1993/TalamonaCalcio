import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBarTala from '../NavBarTala.jsx';
import Footer from './Footer.jsx';
import { getEventi } from '../../../API/Eventi.js';
import '../../../CSS/ArticoloPage.css';

function formatData(dataStr) {
  if (!dataStr) return '';
  try {
    const mesi = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const d = new Date(dataStr);
    return `${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dataStr;
  }
}

export default function ArticoloPage() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [articolo, setArticolo] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [errore, setErrore]     = useState('');

  useEffect(() => {
    getEventi()
      .then(data => {
        const trovato = data.find(e => String(e.id) === String(id));
        if (trovato) setArticolo(trovato);
        else setErrore('Articolo non trovato.');
      })
      .catch(() => setErrore('Errore nel caricamento.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <NavBarTala />

      <div className="art-bg">
        <Container className="art-container">

          {/* Loading */}
          {loading && (
            <p className="art-loading">Caricamento...</p>
          )}

          {/* Errore */}
          {errore && (
            <div className="art-errore">
              <p>{errore}</p>
              <button className="art-btn-back" onClick={() => navigate('/news')}>
                ← Torna alle news
              </button>
            </div>
          )}

          {/* Articolo */}
          {articolo && (
            <>
              <button className="art-btn-back" onClick={() => navigate(-1)}>
                ← Indietro
              </button>

              {/* Badge */}
              <div className="art-badges">
                {articolo.competizione && (
                  <span className="art-badge art-badge--rosso">{articolo.competizione}</span>
                )}
                {articolo.luogo && (
                  <span className={`art-badge ${articolo.luogo === 'Casa' ? 'art-badge--verde' : 'art-badge--blu'}`}>
                    {articolo.luogo}
                  </span>
                )}
                {articolo.risultato && (
                  <span className="art-badge art-badge--grigio">⚽ {articolo.risultato}</span>
                )}
              </div>

              {/* Titolo + Data */}
              <div className="art-header">
                <h1 className="art-titolo">{articolo.titolo}</h1>
                <span className="art-data">{formatData(articolo.data)}</span>
              </div>

              {/* Avversario */}
              {articolo.avversario && (
                <p className="art-avversario">
                  vs <strong>{articolo.avversario}</strong>
                </p>
              )}

              {/* Separatore */}
              <hr className="art-divider" />

              {/* Testo */}
              {articolo.descrizione && (
                <p className="art-testo">{articolo.descrizione}</p>
              )}

              {/* Immagine */}
              {articolo.immagineUrl && (
                <figure className="art-figura">
                  <img
                    src={articolo.immagineUrl}
                    alt={articolo.titolo}
                    className="art-immagine"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400/e81d05/ffffff?text=US+TALAMONESE';
                    }}
                  />
                </figure>
              )}

              {/* Torna alle news */}
              <div className="art-footer-btn">
                <button className="art-btn-primary" onClick={() => navigate('/news')}>
                  ← Torna a tutte le news
                </button>
              </div>
            </>
          )}

        </Container>
      </div>

      <Footer />
    </>
  );
}