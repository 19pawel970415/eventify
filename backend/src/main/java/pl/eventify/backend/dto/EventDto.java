package pl.eventify.backend.dto;

import java.time.LocalDateTime;

public record EventDto(Long id,
                       String title,
                       String description,
                       LocalDateTime eventDate) {
    public static EventDto from(pl.eventify.backend.model.Event e) {
        return new EventDto(e.getId(), e.getTitle(), e.getDescription(), e.getEventDate());
    }
}

