package pl.eventify.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class EventDto {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private LocalDateTime createdAt;
    private Long organizerId;
    private String organizerName;
    private Long cityId;
    private String cityName;
    private String street;
    private String buildingNumber;
    private String apartmentNumber;
    private String postalCode;
    private BigDecimal price;

    private EventDto(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.description = builder.description;
        this.eventDate = builder.eventDate;
        this.createdAt = builder.createdAt;
        this.organizerId = builder.organizerId;
        this.organizerName = builder.organizerName;
        this.cityId = builder.cityId;
        this.cityName = builder.cityName;
        this.street = builder.street;
        this.buildingNumber = builder.buildingNumber;
        this.apartmentNumber = builder.apartmentNumber;
        this.postalCode = builder.postalCode;
        this.price = builder.price;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private LocalDateTime eventDate;
        private LocalDateTime createdAt;
        private Long organizerId;
        private String organizerName;
        private Long cityId;
        private String cityName;
        private String street;
        private String buildingNumber;
        private String apartmentNumber;
        private String postalCode;
        private BigDecimal price;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }
        public Builder title(String title) {
            this.title = title;
            return this;
        }
        public Builder description(String description) {
            this.description = description;
            return this;
        }
        public Builder eventDate(LocalDateTime eventDate) {
            this.eventDate = eventDate;
            return this;
        }
        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }
        public Builder organizerId(Long organizerId) {
            this.organizerId = organizerId;
            return this;
        }
        public Builder organizerName(String organizerName) {
            this.organizerName = organizerName;
            return this;
        }
        public Builder cityId(Long cityId) {
            this.cityId = cityId;
            return this;
        }
        public Builder cityName(String cityName) {
            this.cityName = cityName;
            return this;
        }
        public Builder street(String street) {
            this.street = street;
            return this;
        }
        public Builder buildingNumber(String buildingNumber) {
            this.buildingNumber = buildingNumber;
            return this;
        }
        public Builder apartmentNumber(String apartmentNumber) {
            this.apartmentNumber = apartmentNumber;
            return this;
        }
        public Builder postalCode(String postalCode) {
            this.postalCode = postalCode;
            return this;
        }
        public Builder price (BigDecimal price) {
            this.price = price;
            return this;
        }

        public EventDto build() {
            return new EventDto(this);
        }
    }

    // --- getters ---
    public Long getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public LocalDateTime getEventDate() {
        return eventDate;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public Long getOrganizerId() {
        return organizerId;
    }
    public String getOrganizerName() {
        return organizerName;
    }
    public Long getCityId() {
        return cityId;
    }
    public String getCityName() {
        return cityName;
    }
    public String getStreet() {
        return street;
    }
    public String getBuildingNumber() {
        return buildingNumber;
    }
    public String getApartmentNumber() {
        return apartmentNumber;
    }
    public String getPostalCode() {
        return postalCode;
    }

    public BigDecimal getPrice() {
        return price;
    }
}
