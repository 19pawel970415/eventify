package pl.eventify.backend.controllers;

import org.springframework.web.bind.annotation.*;
import pl.eventify.backend.dto.EventDto;
import pl.eventify.backend.repository.EventRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class WelcomeController {

    private final EventRepository eventRepo;

    public WelcomeController(EventRepository eventRepo) {
        this.eventRepo = eventRepo;
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Eventify";
    }

    @GetMapping("/events/sample")
    public List<EventDto> sampleEvents() {
        return eventRepo.findAll().stream()
                .limit(3)
                .map(EventDto::from)
                .toList();
    }
}
