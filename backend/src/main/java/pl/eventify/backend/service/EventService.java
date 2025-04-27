package pl.eventify.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eventify.backend.dto.CreateEventDto;
import pl.eventify.backend.dto.EventDto;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.City;
import pl.eventify.backend.model.Event;
import pl.eventify.backend.model.User;
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

    /**
     * Pobierz wszystkie wydarzenia jako DTO.
     */
    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Pobierz wydarzenie po id.
     */
    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        return mapToDto(event);
    }

    /**
     * Utwórz nowe wydarzenie.
     */
    public EventDto createEvent(CreateEventDto dto) {
        // Pobierz encje pomocnicze
        City city = cityService.getCityById(dto.getCityId());
        User organizer = userService.getUserById(dto.getOrganizerId());

        // Mapowanie na encję
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setEventDate(dto.getEventDate());
        event.setCity(city);
        event.setOrganizer(organizer);
        event.setStreet(dto.getStreet());
        event.setBuildingNumber(dto.getBuildingNumber());
        event.setApartmentNumber(dto.getApartmentNumber());
        event.setPostalCode(dto.getPostalCode());

        Event saved = eventRepository.save(event);
        return mapToDto(saved);
    }

    /**
     * Zaktualizuj istniejące wydarzenie.
     */
    public EventDto updateEvent(Long id, CreateEventDto dto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        City city = cityService.getCityById(dto.getCityId());
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setEventDate(dto.getEventDate());
        event.setCity(city);
        event.setStreet(dto.getStreet());
        event.setBuildingNumber(dto.getBuildingNumber());
        event.setApartmentNumber(dto.getApartmentNumber());
        event.setPostalCode(dto.getPostalCode());
        // Organizer zwykle nie zmieniamy przy update

        Event updated = eventRepository.save(event);
        return mapToDto(updated);
    }

    /**
     * Usuń wydarzenie.
     */
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        eventRepository.delete(event);
    }

    /**
     * Pomocnicze mapowanie z encji na DTO.
     */
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
                .build();
    }
}
