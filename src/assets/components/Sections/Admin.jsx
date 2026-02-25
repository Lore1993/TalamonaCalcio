import { useState, useEffect } from 'react';
import { login, creaEvento, getEventi } from '../../../API/Eventi.js';
import '../../../CSS/Admin.css';

// ─────────────────────────────────────────────
// Utility: controlla se il token JWT è scaduto
// ─────────────────────────────────────────────
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

export default function AdminPage() {
  const [isLogged, setIsLogged] = useState(tokenValido);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [form, setForm] = useState(FORM_VUOTO);
  const [immagine, setImmagine] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [eventiCount, setEventiCount] = useState(0);

  useEffect(() => {
    if (isLogged) {
      getEventi().then(data => setEventiCount(data.length)).catch(() => {});
    }
  }, [isLogged]);

  const handleImmagine = (e) => {
    const file = e.target.files[0];
    setImmagine(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginErr('');
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      setIsLogged(true);
    } catch {
      setLoginErr('Username o password errati');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await creaEvento(form, immagine);
      setSuccessMsg('✅ Evento creato con successo!');
      setForm(FORM_VUOTO);
      setImmagine(null);
      setPreview(null);
      document.getElementById('file-input').value = '';
      getEventi().then(data => setEventiCount(data.length)).catch(() => {});
    } catch (err) {
      setErrorMsg('❌ Errore: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  // ───────── LOGIN ─────────
  if (!isLogged) {
    return (
      <div className="loginPage">
        <div className="grid" />

        <div className="loginCard">
          <div className="loginBadge">⚽</div>

          <h1 className="loginTitle">Admin Panel</h1>
          <p className="loginSub">US Talamonese — Backoffice</p>

          <form onSubmit={handleLogin} className="fullWidth">
            <div className="inputGroup">
              <label className="label">USERNAME</label>
              <input
                className="input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="inputGroup">
              <label className="label">PASSWORD</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {loginErr && <div className="errBanner">{loginErr}</div>}

            <button className="loginBtn" disabled={loginLoading}>
              {loginLoading ? 'Accesso in corso...' : 'Accedi →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ───────── DASHBOARD ─────────
  return (
    <div className="dashPage">
      <div className="grid" />

      <aside className="sidebar">
        <div className="sideTop">
          ⚽ <span className="sideTitle">Talamonese</span>
        </div>

        <div className="sideBottom">
          <div className="statBox">
            <div className="statNum">
              {eventiCount}<span>/15</span>
            </div>
            <div className="statLabel">eventi attivi</div>
          </div>
          <button onClick={handleLogout} className="logoutBtn">
            Esci ↗
          </button>
        </div>
      </aside>

      <main className="main">
        <h2 className="mainTitle">Nuovo Evento</h2>

        {successMsg && <div className="successBanner">{successMsg}</div>}
        {errorMsg && <div className="errBanner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="field full">
            <label className="label">TITOLO *</label>
            <input className="input" value={form.titolo} onChange={set('titolo')} required />
          </div>

          <div className="field">
            <label className="label">DATA *</label>
            <input type="date" className="input" value={form.data} onChange={set('data')} required />
          </div>

          <div className="field">
            <label className="label">AVVERSARIO</label>
            <input className="input" value={form.avversario} onChange={set('avversario')} />
          </div>

          <div className="field full">
            <label className="label">IMMAGINE</label>
            <input id="file-input" type="file" accept="image/*" onChange={handleImmagine} />
          </div>

          <button className="submitBtn" disabled={saving}>
            {saving ? 'Pubblicazione...' : '🚀 Pubblica Evento'}
          </button>
        </form>
      </main>
    </div>
  );
}