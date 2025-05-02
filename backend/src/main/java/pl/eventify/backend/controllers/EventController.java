package pl.eventify.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.eventify.backend.dto.EventDto;
import pl.eventify.backend.service.EventService;
import pl.eventify.backend.service.LikedEventService;
import pl.eventify.backend.repository.UserRepository;
import pl.eventify.backend.model.User;
import pl.eventify.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final LikedEventService likedEventService;
    private final UserRepository userRepository;

    public EventController(EventService eventService,
                           LikedEventService likedEventService,
                           UserRepository userRepository) {
        this.eventService = eventService;
        this.likedEventService = likedEventService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        EventDto dto = eventService.getEventById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Void> likeEvent(@PathVariable("id") Long eventId,
                                          Authentication authentication) {
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        likedEventService.likeEvent(user.getId(), eventId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/liked")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<EventDto>> getLikedEvents(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User","email",email));

        List<EventDto> liked = likedEventService.getLikedEventsForUser(user.getId())
                .stream()
                .map(le -> eventService.getEventById(le.getEvent().getId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(liked);
    }
}
