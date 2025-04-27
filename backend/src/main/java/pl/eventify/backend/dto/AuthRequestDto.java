package pl.eventify.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO do rejestracji i logowania.
 *
 * - email: musi być poprawnym adresem
 * - password: min. 8 znaków
 * - name: tylko przy rejestracji; opcjonalne przy loginie
 */
public class AuthRequestDto {

    @Email(message = "Nieprawidłowy format email")
    @NotBlank(message = "Email jest wymagany")
    private String email;

    @NotBlank(message = "Hasło jest wymagane")
    @Size(min = 8, message = "Hasło musi mieć min. 8 znaków")
    private String password;

    // Pole opcjonalne przy logowaniu, wymagane przy rejestracji
    @NotBlank(message = "Imię jest wymagane")
    private String name;

    // --- konstruktor bezargumentowy potrzebny przez Jacksona ---
    public AuthRequestDto() { }

    // --- konstruktor pełny (np. do testów) ---
    public AuthRequestDto(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    // --- gettery / settery ---
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
