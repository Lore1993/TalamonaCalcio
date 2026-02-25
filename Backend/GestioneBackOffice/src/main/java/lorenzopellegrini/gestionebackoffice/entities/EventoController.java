package lorenzopellegrini.gestionebackoffice.entities;

import lombok.RequiredArgsConstructor;
import lorenzopellegrini.gestionebackoffice.services.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/eventi")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService eventoService;
    private final ObjectMapper objectMapper;

    // Tutti possono vedere gli eventi
    @GetMapping
    public List<Evento> getAll() {
        return eventoService.findAll();
    }

    @GetMapping("/{id}")
    public Evento getById(@PathVariable Long id) {
        return eventoService.findById(id);
    }

    // Solo admin - crea evento con immagine opzionale
    // Usiamo multipart/form-data per inviare sia JSON che file
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Evento> create(
            @RequestPart("evento") String eventoJson,
            @RequestPart(value = "immagine", required = false) MultipartFile immagine
    ) throws IOException {
        Evento evento = objectMapper.readValue(eventoJson, Evento.class);
        Evento created = eventoService.create(evento, immagine);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Solo admin - modifica evento
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Evento update(
            @PathVariable Long id,
            @RequestPart("evento") String eventoJson,
            @RequestPart(value = "immagine", required = false) MultipartFile immagine
    ) throws IOException {
        Evento evento = objectMapper.readValue(eventoJson, Evento.class);
        return eventoService.update(id, evento, immagine);
    }

    // Solo admin - cancella evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
