import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBarTala from '../NavBarTala.jsx';
import Footer from './Footer.jsx';
import { getEventi } from '../../../API/Eventi.js';

function formatData(dataStr) {
  if (!dataStr) return '';
  try {
    const mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
                  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
    const d = new Date(dataStr);
    return `${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
  } catch { return dataStr; }
}

export default function ArticoloPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [articolo, setArticolo] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [errore, setErrore]     = useState('');

  useEffect(() => {
    getEventi()
      .then(data => {
        // data è l'array grezzo dal backend — cerchiamo per e.id
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
      <Container style={{ maxWidth: '820px', padding: '48px 20px 80px' }}>

        {loading && <p className="text-muted text-center py-5">Caricamento...</p>}

        {errore && (
          <div className="text-center py-5">
            <p className="text-danger mb-4">{errore}</p>
            <button onClick={() => navigate('/news')} style={st.btnBack}>← Torna alle news</button>
          </div>
        )}

        {articolo && (
          <>
            <button onClick={() => navigate(-1)} style={st.btnBack}>← Indietro</button>

            {/* Badge */}
            <div style={{ display: 'flex', gap: '8px', margin: '24px 0 16px', flexWrap: 'wrap' }}>
              {articolo.competizione && <span style={st.badge('#e81d05')}>{articolo.competizione}</span>}
              {articolo.luogo && (
                <span style={st.badge(articolo.luogo === 'Casa' ? '#2a7a2a' : '#1a5a9a')}>
                  {articolo.luogo}
                </span>
              )}
              {articolo.risultato && <span style={st.badge('#333')}>⚽ {articolo.risultato}</span>}
            </div>

            {/* Titolo + Data */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '800', color: '#1a1a1a', lineHeight: 1.2, flex: 1 }}>
                {articolo.titolo}
              </h1>
              <span style={{ fontSize: '0.9rem', color: '#888', whiteSpace: 'nowrap', paddingTop: '8px' }}>
                {formatData(articolo.data)}
              </span>
            </div>

            {articolo.avversario && (
              <p style={{ color: '#666', fontSize: '1rem', marginBottom: '32px' }}>
                vs <strong>{articolo.avversario}</strong>
              </p>
            )}

            <hr style={{ borderColor: '#e81d05', borderWidth: '2px', marginBottom: '32px' }} />

            {/* Testo */}
            {articolo.descrizione && (
              <p style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#333', marginBottom: '40px', whiteSpace: 'pre-wrap' }}>
                {articolo.descrizione}
              </p>
            )}

            {/* Immagine */}
            {articolo.immagineUrl && (
              <img
                src={articolo.immagineUrl}
                alt={articolo.titolo}
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '480px', display: 'block' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400/e81d05/ffffff?text=US+TALAMONESE'; }}
              />
            )}

            <div style={{ marginTop: '56px', textAlign: 'center' }}>
              <button onClick={() => navigate('/news')} style={st.btnPrimary}>← Torna a tutte le news</button>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

const st = {
  btnBack:   { background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem', padding: 0, textDecoration: 'underline' },
  btnPrimary:{ background: '#e81d05', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer' },
  badge: (c) => ({ background: c, color: '#fff', fontSize: '0.75rem', fontWeight: '700', padding: '4px 12px', borderRadius: '20px' })
};