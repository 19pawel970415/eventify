package pl.eventify.backend.model;

import jakarta.persistence.Column;

import java.util.Objects;

public class BoughtEventId {
    private static final long serialVersionUID = 1L;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "event_id")
    private Long eventId;

    public BoughtEventId(Long userId, Long eventId) {
        this.userId = userId;
        this.eventId = eventId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getEventId() {
        return eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BoughtEventId)) return false;
        BoughtEventId that = (BoughtEventId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(eventId, that.eventId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, eventId);
    }
}
