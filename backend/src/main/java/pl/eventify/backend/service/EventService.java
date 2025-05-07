package pl.eventify.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eventify.backend.dto.EventDto;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.Event;
import pl.eventify.backend.repository.EventRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final CityService cityService;
    private final UserService userService;

    @Autowired
    public EventService(EventRepository eventRepository,
                        CityService cityService,
                        UserService userService) {
        this.eventRepository = eventRepository;
        this.cityService = cityService;
        this.userService = userService;
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        return mapToDto(event);
    }

    private EventDto mapToDto(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .eventDate(event.getEventDate())
                .createdAt(event.getCreatedAt())
                .organizerId(event.getOrganizer().getId())
                .organizerName(event.getOrganizer().getName())
                .cityId(event.getCity().getId())
                .cityName(event.getCity().getName())
                .street(event.getStreet())
                .buildingNumber(event.getBuildingNumber())
                .apartmentNumber(event.getApartmentNumber())
                .postalCode(event.getPostalCode())
                .price(event.getPrice())
                .build();
    }
}
