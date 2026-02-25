import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarTala from '../NavBarTala.jsx';
import '../../../CSS/NewsPage.css';
import Footer from './Footer';
import NewsSecTala from './NewsSecTala.jsx';
import { getEventi, cancellaEvento, modificaEvento } from '../api/eventi.js';

/* ─────────────────────────────────────────────
   Controllo validità token JWT
───────────────────────────────────────────── */
function tokenValido() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

const FORM_VUOTO = {
  titolo: '',
  descrizione: '',
  data: '',
  avversario: '',
  luogo: '',
  competizione: '',
  risultato: ''
};

export default function NewsPage() {

  /* ───────── DATI ───────── */
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState('');

  /* ───────── AUTH ───────── */
  const [isAdmin, setIsAdmin] = useState(tokenValido);

  /* ───────── MODAL MODIFICA ───────── */
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(FORM_VUOTO);
  const [nuovaImmagine, setNuovaImmagine] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  /* ───────── PAGINAZIONE ───────── */
  const NEWS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);

  /* ───────────────────────────────────────────── */

  const caricaEventi = () => {
    setLoading(true);

    getEventi()
      .then(data => {
        setAllNews(
          data.map(e => ({
            id: e.id,
            title: e.titolo,
            description: e.descrizione,
            image: e.immagineUrl,
            date: e.data,
            avversario: e.avversario,
            luogo: e.luogo,
            competizione: e.competizione,
            risultato: e.risultato
          }))
        );
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

  /* ───────── MODIFICA ───────── */

  const apriModifica = (item) => {
    setForm({
      titolo: item.title || '',
      descrizione: item.description || '',
      data: item.date || '',
      avversario: item.avversario || '',
      luogo: item.luogo || '',
      competizione: item.competizione || '',
      risultato: item.risultato || ''
    });

    setNuovaImmagine(null);
    setPreview(null);
    setEditingId(item.id);
    setShowModal(true);
  };

  const chiudiModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(FORM_VUOTO);
    setNuovaImmagine(null);
    setPreview(null);
  };

  const handleSalva = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await modificaEvento(editingId, form, nuovaImmagine);
      chiudiModal();
      caricaEventi();
    } catch (err) {
      alert('Errore salvataggio: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await cancellaEvento(id);
      caricaEventi();
    } catch {
      alert('Errore durante la cancellazione');
    }
  };

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleImmagine = (e) => {
    const file = e.target.files[0];
    setNuovaImmagine(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  /* ───────── PAGINAZIONE ───────── */

  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const displayedNews = allNews.slice(startIndex, startIndex + NEWS_PER_PAGE);
  const totalPages = Math.ceil(allNews.length / NEWS_PER_PAGE);

  /* ───────────────────────────────────────────── */

  return (
    <>
      <NavBarTala />

      <Container fluid className="news-page mt-4">
        <Row>
          <Col xs={2} className="bg-green-side" />

          <Col xs={8}>
            <div className="title-green p-3 mb-4 d-flex justify-content-between align-items-center">
              <h1 className="news-title mb-0">
                TALAMONESE NEWS ed EVENTI
              </h1>

              {isAdmin && (
                <span className="admin-badge">
                  🔓 modalità admin
                </span>
              )}
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
                  onDelete={handleDelete}
                  onEdit={apriModifica}
                />

                <div className="pagination-wrapper">
                  <span>
                    Pagina {currentPage} di {totalPages}
                  </span>

                  <div className="btn-group">
                    <button
                      className="btn btn-outline-danger"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      ← Precedente
                    </button>

                    <button
                      className="btn btn-outline-danger"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
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

      {/* ═════════ MODAL MODIFICA ═════════ */}
      {showModal && (
        <div className="edit-modal-overlay" onClick={chiudiModal}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>

            <div className="edit-modal-header">
              <div>
                <h3>✏️ Modifica Evento</h3>
                <p>I campi lasciati vuoti mantengono il valore attuale</p>
              </div>

              <button
                onClick={chiudiModal}
                className="edit-close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalva} className="edit-form">

              <div className="edit-full">
                <label className="edit-label">TITOLO *</label>
                <input className="edit-input" value={form.titolo} onChange={set('titolo')} required />
              </div>

              <div className="edit-full">
                <label className="edit-label">DESCRIZIONE</label>
                <textarea
                  className="edit-input edit-textarea"
                  value={form.descrizione}
                  onChange={set('descrizione')}
                />
              </div>

              <div>
                <label className="edit-label">DATA *</label>
                <input type="date" className="edit-input" value={form.data} onChange={set('data')} required />
              </div>

              <div>
                <label className="edit-label">AVVERSARIO</label>
                <input className="edit-input" value={form.avversario} onChange={set('avversario')} />
              </div>

              <div>
                <label className="edit-label">LUOGO</label>
                <select className="edit-input" value={form.luogo} onChange={set('luogo')}>
                  <option value="">— seleziona —</option>
                  <option value="Casa">Casa</option>
                  <option value="Trasferta">Trasferta</option>
                </select>
              </div>

              <div>
                <label className="edit-label">COMPETIZIONE</label>
                <input className="edit-input" value={form.competizione} onChange={set('competizione')} />
              </div>

              <div className="edit-full">
                <label className="edit-label">RISULTATO</label>
                <input
                  className="edit-input"
                  value={form.risultato}
                  onChange={set('risultato')}
                />
              </div>

              <div className="edit-full">
                <label className="edit-label">
                  NUOVA IMMAGINE (opzionale)
                </label>

                <div className="edit-upload-box">
                  {preview ? (
                    <div className="edit-preview-wrapper">
                      <img src={preview} alt="preview" />
                      <button
                        type="button"
                        className="edit-remove-btn"
                        onClick={() => {
                          setNuovaImmagine(null);
                          setPreview(null);
                          document.getElementById('edit-file').value = '';
                        }}
                      >
                        ✕ Rimuovi
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="edit-file" className="edit-upload-label">
                      📷 Clicca per cambiare immagine
                    </label>
                  )}

                  <input
                    id="edit-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImmagine}
                    hidden
                  />
                </div>
              </div>

              <div className="edit-buttons">
                <button type="submit" disabled={saving} className="edit-save-btn">
                  {saving ? 'Salvataggio...' : '💾 Salva modifiche'}
                </button>

                <button type="button" onClick={chiudiModal} className="edit-cancel-btn">
                  Annulla
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </>
  );
}



