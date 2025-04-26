package pl.eventify.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eventify.backend.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
}
