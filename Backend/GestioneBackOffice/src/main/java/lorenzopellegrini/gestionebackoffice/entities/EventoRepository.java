package lorenzopellegrini.gestionebackoffice.entities;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    // Tutti gli eventi ordinati dal più recente
    List<Evento> findAllByOrderByDataDesc();
}