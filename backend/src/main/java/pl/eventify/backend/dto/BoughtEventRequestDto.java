package pl.eventify.backend.dto;

import java.time.LocalDateTime;

public class BoughtEventRequestDto {
    private LocalDateTime eventDate;
    private int amount;
    private double priceAll;

    public BoughtEventRequestDto() {
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
}
