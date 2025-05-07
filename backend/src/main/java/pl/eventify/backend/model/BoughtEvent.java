package pl.eventify.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bought_events")

public class BoughtEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @ManyToOne(optional = false)
    private Event event;

    private LocalDateTime eventDate;

    private LocalDateTime createdAt;

    private int amount;
    private double priceAll;

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Event getEvent() {
        return event;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public int getAmount() {
        return amount;
    }

    public double getPriceAll() {
        return priceAll;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setPriceAll(double priceAll) {
        this.priceAll = priceAll;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
