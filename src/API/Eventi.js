const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Prende tutti gli eventi dal backend
export async function getEventi() {
  const res = await fetch(`${BASE_URL}/api/eventi`);
  if (!res.ok) throw new Error('Errore nel caricamento eventi');
  return res.json();
}

// Login admin
export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Credenziali non valide');
  return res.json(); // → { token: "eyJ..." }
}

// Crea evento (solo admin)
export async function creaEvento(eventoJson, immagineFile) {
  const formData = new FormData();
  formData.append('evento', JSON.stringify(eventoJson));
  if (immagineFile) formData.append('immagine', immagineFile);

  const res = await fetch(`${BASE_URL}/api/eventi`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: formData
  });
  if (!res.ok) throw new Error('Errore creazione evento');
  return res.json();
}

// Modifica evento
export async function modificaEvento(id, eventoJson, immagineFile) {
  const formData = new FormData();
  formData.append('evento', JSON.stringify(eventoJson));
  if (immagineFile) formData.append('immagine', immagineFile);

  const res = await fetch(`${BASE_URL}/api/eventi/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    body: formData
  });
  if (!res.ok) throw new Error('Errore modifica evento');
  return res.json();
}

// Cancella evento
export async function cancellaEvento(id) {
  const res = await fetch(`${BASE_URL}/api/eventi/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Errore cancellazione');
}