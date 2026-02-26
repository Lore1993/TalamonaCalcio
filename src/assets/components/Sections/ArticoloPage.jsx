import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBarTala from '../NavBarTala.jsx';
import Footer from './Footer.jsx';
import { getEventi } from '../../../API/Eventi.js';

// Formatta "2025-06-15" → "15 Giugno 2025"
function formatData(dataStr) {
  if (!dataStr) return '';
  try {
    const mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
                  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
    const d = new Date(dataStr);
    return `${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dataStr;
  }
}

export default function ArticoloPage() {
  const { id } = useParams();         // prende l'id dall'URL /articolo/5
  const navigate = useNavigate();

  const [articolo, setArticolo] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [errore, setErrore]     = useState('');

  useEffect(() => {
    getEventi()
      .then(data => {
        const trovato = data.find(e => String(e.id) === String(id));
        if (trovato) {
          setArticolo(trovato);
        } else {
          setErrore('Articolo non trovato.');
        }
      })
      .catch(() => setErrore('Errore nel caricamento.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <NavBarTala />

      <Container style={{ maxWidth: '820px', padding: '48px 20px 80px' }}>

        {/* ── Loading ── */}
        {loading && (
          <p className="text-muted text-center py-5">Caricamento...</p>
        )}

        {/* ── Errore ── */}
        {errore && (
          <div className="text-center py-5">
            <p className="text-danger mb-4">{errore}</p>
            <button
              onClick={() => navigate('/news')}
              style={btnBack}
            >
              ← Torna alle news
            </button>
          </div>
        )}

        {/* ── Articolo ── */}
        {articolo && (
          <>
            {/* Breadcrumb / back */}
            <button onClick={() => navigate(-1)} style={btnBack}>
              ← Indietro
            </button>

            {/* Badge competizione / luogo */}
            <div style={{ display: 'flex', gap: '8px', margin: '24px 0 16px', flexWrap: 'wrap' }}>
              {articolo.competizione && (
                <span style={badge('#e81d05')}>{articolo.competizione}</span>
              )}
              {articolo.luogo && (
                <span style={badge(articolo.luogo === 'Casa' ? '#2a7a2a' : '#1a5a9a')}>
                  {articolo.luogo}
                </span>
              )}
              {articolo.risultato && (
                <span style={badge('#333')}>⚽ {articolo.risultato}</span>
              )}
            </div>

            {/* Titolo + data */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: '8px'
            }}>
              <h1 style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: '800',
                color: '#1a1a1a',
                lineHeight: 1.2,
                flex: 1
              }}>
                {articolo.titolo}
              </h1>
              <span style={{
                fontSize: '0.9rem',
                color: '#888',
                whiteSpace: 'nowrap',
                paddingTop: '8px'
              }}>
                {formatData(articolo.data)}
              </span>
            </div>

            {/* Avversario */}
            {articolo.avversario && (
              <p style={{ color: '#666', fontSize: '1rem', marginBottom: '32px' }}>
                vs <strong>{articolo.avversario}</strong>
              </p>
            )}

            {/* Separatore */}
            <hr style={{ borderColor: '#e81d05', borderWidth: '2px', marginBottom: '32px' }} />

            {/* Testo descrizione */}
            {articolo.descrizione && (
              <p style={{
                fontSize: '1.08rem',
                lineHeight: '1.85',
                color: '#333',
                marginBottom: '40px',
                whiteSpace: 'pre-wrap'   // rispetta gli a capo inseriti nel form
              }}>
                {articolo.descrizione}
              </p>
            )}

            {/* Immagine */}
            {articolo.immagineUrl && (
              <figure style={{ margin: 0 }}>
                <img
                  src={articolo.immagineUrl}
                  alt={articolo.titolo}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    maxHeight: '480px',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/e81d05/ffffff?text=US+TALAMONESE';
                  }}
                />
                <figcaption style={{
                  fontSize: '0.8rem', color: '#aaa',
                  marginTop: '8px', textAlign: 'center'
                }}>
                  {articolo.titolo}
                </figcaption>
              </figure>
            )}

            {/* Torna alle news */}
            <div style={{ marginTop: '56px', textAlign: 'center' }}>
              <button onClick={() => navigate('/news')} style={btnPrimary}>
                ← Torna a tutte le news
              </button>
            </div>
          </>
        )}
      </Container>

      <Footer />
    </>
  );
}