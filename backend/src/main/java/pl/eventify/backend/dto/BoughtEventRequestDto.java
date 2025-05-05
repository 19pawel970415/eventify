package pl.eventify.backend.dto;

import java.time.LocalDateTime;

public class BoughtEventRequestDto {
    private LocalDateTime eventDate;
    private int amount;
    private double priceAll;

    public BoughtEventRequestDto() {}  // <-- konieczny domyślny

    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public double getPriceAll() { return priceAll; }
    public void setPriceAll(double priceAll) { this.priceAll = priceAll; }
}
