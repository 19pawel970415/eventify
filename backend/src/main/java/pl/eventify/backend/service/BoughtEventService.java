package pl.eventify.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.BoughtEvent;
import pl.eventify.backend.model.Event;
import pl.eventify.backend.model.User;
import pl.eventify.backend.repository.BoughtEventRepository;
import pl.eventify.backend.repository.EventRepository;
import pl.eventify.backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoughtEventService {

    private final BoughtEventRepository boughtRepo;
    private final UserRepository userRepo;
    private final EventRepository eventRepo;

    public BoughtEventService(BoughtEventRepository boughtRepo,
                              UserRepository userRepo,
                              EventRepository eventRepo) {
        this.boughtRepo = boughtRepo;
        this.userRepo = userRepo;
        this.eventRepo = eventRepo;
    }

    @Transactional
    public void buyTicket(Long userId, Long eventId, LocalDateTime eventDate, int amount, double priceAll) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", eventId));

        BoughtEvent bought = new BoughtEvent();
        bought.setUser(user);
        bought.setEvent(event);
        bought.setEventDate(eventDate);
        bought.setAmount(amount);
        bought.setPriceAll(priceAll);

        boughtRepo.save(bought);
    }

    public List<BoughtEvent> getBoughtEventsForUser(Long userId) {
        return boughtRepo.findAllByUserId(userId);
    }
}
