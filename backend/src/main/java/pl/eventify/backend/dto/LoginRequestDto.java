package pl.eventify.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO do logowania użytkownika.
 */
public class LoginRequestDto {

    @Email(message = "Nieprawidłowy format email")
    @NotBlank(message = "Email jest wymagany")
    private String email;

    @NotBlank(message = "Hasło jest wymagane")
    @Size(min = 8, message = "Hasło musi mieć min. 8 znaków")
    private String password;

    public LoginRequestDto() { }

    public LoginRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public @Email(message = "Nieprawidłowy format email") @NotBlank(message = "Email jest wymagany") String getEmail() {
        return email;
    }

    public @NotBlank(message = "Hasło jest wymagane") @Size(min = 8, message = "Hasło musi mieć min. 8 znaków") String getPassword() {
        return password;
    }
}
