package pl.eventify.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import pl.eventify.backend.model.BoughtEvent;
import pl.eventify.backend.model.BoughtEventId;

import java.util.List;

public interface BoughtEventRepository extends JpaRepository<BoughtEvent, BoughtEventId> {
    List<BoughtEvent> findAllByUserId(Long userId);
}
