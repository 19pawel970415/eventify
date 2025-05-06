package pl.eventify.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.eventify.backend.dto.BoughtEventRequestDto;
import pl.eventify.backend.dto.EventDto;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.BoughtEvent;
import pl.eventify.backend.model.User;
import pl.eventify.backend.repository.BoughtEventRepository;
import pl.eventify.backend.repository.UserRepository;
import pl.eventify.backend.service.BoughtEventService;
import pl.eventify.backend.service.EventService;
import pl.eventify.backend.service.LikedEventService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final LikedEventService likedEventService;
    private final UserRepository userRepository;
    private final BoughtEventService boughtEventService;
    private final BoughtEventRepository boughtEventRepository;

    public EventController(EventService eventService,
                           LikedEventService likedEventService,
                           UserRepository userRepository,
                           BoughtEventService boughtEventService,
                           BoughtEventRepository boughtEventRepository) {
        this.eventService = eventService;
        this.likedEventService = likedEventService;
        this.userRepository = userRepository;
        this.boughtEventService = boughtEventService;
        this.boughtEventRepository = boughtEventRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<EventDto> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
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
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<EventDto> liked = likedEventService.getLikedEventsForUser(user.getId())
                .stream()
                .map(le -> eventService.getEventById(le.getEvent().getId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(liked);
    }

    @DeleteMapping("/{id}/liked")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> unlikeEvent(@PathVariable("id") Long eventId,
                                            Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        likedEventService.unlikeEvent(user.getId(), eventId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{eventId}/buy")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> buyTicket(
            @PathVariable Long eventId,
            @RequestBody BoughtEventRequestDto dto,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        boughtEventService.buyTicket(
                user.getId(),
                eventId,
                dto.getEventDate(),
                dto.getAmount(),
                dto.getPriceAll()
        );

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @GetMapping("/bought_events")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<EventDto>> getBoughtEvents(Authentication auth) {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<BoughtEvent> boughtEvents = boughtEventRepository.findAllByUserId(user.getId());

        List<EventDto> dtos = boughtEvents.stream()
                .map(be -> {
                    EventDto base = eventService.getEventById(be.getEvent().getId());
                    return EventDto.builder()
                            .id(base.getId())
                            .title(base.getTitle())
                            .description(base.getDescription())
                            .eventDate(base.getEventDate())
                            .createdAt(base.getCreatedAt())
                            .organizerId(base.getOrganizerId())
                            .organizerName(base.getOrganizerName())
                            .cityId(base.getCityId())
                            .cityName(base.getCityName())
                            .street(base.getStreet())
                            .buildingNumber(base.getBuildingNumber())
                            .apartmentNumber(base.getApartmentNumber())
                            .postalCode(base.getPostalCode())
                            .price(base.getPrice())
                            .amount(be.getAmount())
                            .priceAll(be.getPriceAll())
                            .build();
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
