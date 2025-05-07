package pl.eventify.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eventify.backend.model.BoughtEvent;
import pl.eventify.backend.model.BoughtEventId;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BoughtEventRepository extends JpaRepository<BoughtEvent, BoughtEventId> {
    List<BoughtEvent> findAllByUserId(Long userId);

    Optional<BoughtEvent> findByUserIdAndEventIdAndEventDate(Long userId, Long eventId, LocalDateTime eventDate);
}
