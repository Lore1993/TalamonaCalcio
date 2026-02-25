package lorenzopellegrini.gestionebackoffice.services;


import lombok.RequiredArgsConstructor;
import lorenzopellegrini.gestionebackoffice.entities.Evento;
import lorenzopellegrini.gestionebackoffice.entities.EventoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoService {

    private static final int MAX_EVENTI = 15;

    private final EventoRepository eventoRepository;
    private final CloudinaryService cloudinaryService;

    public List<Evento> findAll() {
        return eventoRepository.findAllByOrderByDataDesc();
    }

    public Evento findById(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento non trovato"));
    }

    public Evento create(Evento evento, MultipartFile immagine) throws IOException {
        // Carica immagine su Cloudinary se presente
        if (immagine != null && !immagine.isEmpty()) {
            String url = cloudinaryService.upload(immagine);
            evento.setImmagineUrl(url);
        }

        Evento saved = eventoRepository.save(evento);

        // Se superiamo i 15 eventi, cancella il più vecchio
        List<Evento> tutti = eventoRepository.findAllByOrderByDataDesc();
        if (tutti.size() > MAX_EVENTI) {
            Evento piuVecchio = tutti.get(tutti.size() - 1);
            cloudinaryService.delete(piuVecchio.getImmagineUrl());
            eventoRepository.delete(piuVecchio);
        }

        return saved;
    }

    public Evento update(Long id, Evento datiAggiornati, MultipartFile nuovaImmagine) throws IOException {
        Evento esistente = findById(id);

        esistente.setTitolo(datiAggiornati.getTitolo());
        esistente.setDescrizione(datiAggiornati.getDescrizione());
        esistente.setData(datiAggiornati.getData());
        esistente.setAvversario(datiAggiornati.getAvversario());
        esistente.setLuogo(datiAggiornati.getLuogo());
        esistente.setCompetizione(datiAggiornati.getCompetizione());
        esistente.setRisultato(datiAggiornati.getRisultato());

        // Se viene caricata una nuova immagine, cancella la vecchia e carica la nuova
        if (nuovaImmagine != null && !nuovaImmagine.isEmpty()) {
            cloudinaryService.delete(esistente.getImmagineUrl());
            String nuovoUrl = cloudinaryService.upload(nuovaImmagine);
            esistente.setImmagineUrl(nuovoUrl);
        }

        return eventoRepository.save(esistente);
    }

    public void delete(Long id) {
        Evento evento = findById(id);
        cloudinaryService.delete(evento.getImmagineUrl());
        eventoRepository.delete(evento);
    }
}