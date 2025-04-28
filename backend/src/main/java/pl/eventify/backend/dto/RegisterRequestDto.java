package pl.eventify.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO do rejestracji użytkownika.
 */
public class RegisterRequestDto {

    @Email(message = "Nieprawidłowy format email")
    @NotBlank(message = "Email jest wymagany")
    private String email;

    @NotBlank(message = "Hasło jest wymagane")
    @Size(min = 8, message = "Hasło musi mieć min. 8 znaków")
    private String password;

    @NotBlank(message = "Imię jest wymagane")
    private String name;

    public RegisterRequestDto() { }

    public RegisterRequestDto(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public @Email(message = "Nieprawidłowy format email") @NotBlank(message = "Email jest wymagany") String getEmail() {
        return email;
    }

    public @NotBlank(message = "Hasło jest wymagane") @Size(min = 8, message = "Hasło musi mieć min. 8 znaków") String getPassword() {
        return password;
    }

    public @NotBlank(message = "Imię jest wymagane") String getName() {
        return name;
    }
}
