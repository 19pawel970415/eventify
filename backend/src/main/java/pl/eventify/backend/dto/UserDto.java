package pl.eventify.backend.dto;

import java.time.Instant;

/**
 * DTO do zwracania danych użytkownika (bez hasła).
 */
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private Instant createdAt;

    public UserDto() { }

    public UserDto(Long id, String name, String email, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    // konwerter z encji
    public static UserDto from(pl.eventify.backend.model.User u) {
        return new UserDto(
                u.getId(),
                u.getName(),
                u.getEmail(),
                u.getCreatedAt()
        );
    }

    // --- gettery / settery ---
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
