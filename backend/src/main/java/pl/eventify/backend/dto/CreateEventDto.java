package pl.eventify.backend.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.text.DecimalFormat;
import java.time.LocalDateTime;

public class CreateEventDto {

    @NotBlank
    private String title;

    private String description;

    @Future
    @NotNull
    private LocalDateTime eventDate;

    @NotNull
    private Long organizerId;

    @NotNull
    private Long cityId;

    @NotBlank
    private String street;

    @NotBlank
    private String buildingNumber;

    private String apartmentNumber;

    @NotBlank
    private String postalCode;

    @NotBlank
    private DecimalFormat price;

    // --- getters & setters ---

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }
    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public Long getOrganizerId() {
        return organizerId;
    }
    public void setOrganizerId(Long organizerId) {
        this.organizerId = organizerId;
    }

    public Long getCityId() {
        return cityId;
    }
    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }

    public String getBuildingNumber() {
        return buildingNumber;
    }
    public void setBuildingNumber(String buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    public String getApartmentNumber() {
        return apartmentNumber;
    }
    public void setApartmentNumber(String apartmentNumber) {
        this.apartmentNumber = apartmentNumber;
    }

    public String getPostalCode() {
        return postalCode;
    }
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
    public DecimalFormat getPrice() {
        return price;
    }
    public void setPrice(DecimalFormat price) {
        this.price = price;
    }
}
