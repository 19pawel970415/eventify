package pl.eventify.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eventify.backend.exception.AlreadyLikedException;
import pl.eventify.backend.model.LikedEvent;
import pl.eventify.backend.model.LikedEventId;
import pl.eventify.backend.model.User;
import pl.eventify.backend.model.Event;
import pl.eventify.backend.repository.LikedEventRepository;
import pl.eventify.backend.repository.UserRepository;
import pl.eventify.backend.repository.EventRepository;
import pl.eventify.backend.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class LikedEventService {

    private final LikedEventRepository likedRepo;
    private final UserRepository userRepo;
    private final EventRepository eventRepo;

    public LikedEventService(LikedEventRepository likedRepo,
                             UserRepository userRepo,
                             EventRepository eventRepo) {
        this.likedRepo  = likedRepo;
        this.userRepo   = userRepo;
        this.eventRepo  = eventRepo;
    }

    /**
     * Zapisuje w bazie relację „user polubił event”.
     * @param userId  ID zalogowanego użytkownika
     * @param eventId ID wydarzenia
     */
    @Transactional
    public void likeEvent(Long userId, Long eventId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", eventId));

        LikedEventId key = new LikedEventId(userId, eventId);
        if (likedRepo.existsById(key)) {
            throw new AlreadyLikedException(userId, eventId);
        }

        LikedEvent liked = new LikedEvent(user, event);
        likedRepo.save(liked);
    }

    public List<LikedEvent> getLikedEventsForUser(Long userId) {
        return likedRepo.findAllByUserId(userId);
    }
}
