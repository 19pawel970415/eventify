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
import java.util.Optional;

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
    public void buyTicket(Long userId,
                          Long eventId,
                          LocalDateTime eventDate,
                          int amount,
                          double priceAll) {
        // 1. Pobierz usera i event (jak do tej pory)
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", eventId));

        // 2. Spróbuj znaleźć już istniejący zakup
        Optional<BoughtEvent> existing = boughtRepo
                .findByUserIdAndEventIdAndEventDate(userId, eventId, eventDate);

        if (existing.isPresent()) {
            // 3a. Jeśli jest, to sumujemy ilości i kwoty, oraz nadpisujemy datę
            BoughtEvent be = existing.get();
            be.setAmount(be.getAmount() + amount);
            be.setPriceAll(be.getPriceAll() + priceAll);
            be.setCreatedAt(LocalDateTime.now());     // albo inna logika np. dto.getPurchaseTime()
            boughtRepo.save(be);
        } else {
            // 3b. Jeśli nie ma – normalnie tworzymy nowy
            BoughtEvent be = new BoughtEvent();
            be.setUser(user);
            be.setEvent(event);
            be.setEventDate(eventDate);
            be.setAmount(amount);
            be.setPriceAll(priceAll);
            be.setCreatedAt(LocalDateTime.now());
            boughtRepo.save(be);
        }
    }

    public List<BoughtEvent> getBoughtEventsForUser(Long userId) {
        return boughtRepo.findAllByUserId(userId);
    }
}
