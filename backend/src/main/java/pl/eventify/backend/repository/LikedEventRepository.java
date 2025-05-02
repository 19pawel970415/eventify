package pl.eventify.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import pl.eventify.backend.model.LikedEvent;
import pl.eventify.backend.model.LikedEventId;

import java.util.List;

public interface LikedEventRepository extends JpaRepository<LikedEvent, LikedEventId> {
    List<LikedEvent> findAllByUserId(Long userId);
}
