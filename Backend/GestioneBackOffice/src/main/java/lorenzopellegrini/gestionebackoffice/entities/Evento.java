package lorenzopellegrini.gestionebackoffice.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "eventi")
@Data
@NoArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String titolo;

    @Column(columnDefinition = "TEXT")
    private String descrizione;

    @NotNull
    private LocalDate data;

    private String avversario;

    // "Casa" o "Trasferta"
    private String luogo;

    // Es. "Serie A", "Coppa Italia", "Amichevole"
    private String competizione;

    // Null finché la partita non è giocata, poi es. "2-1"
    private String risultato;

    // URL dell'immagine su Cloudinary
    private String immagineUrl;
}
