package pl.eventify.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eventify.backend.dto.UserDto;
import pl.eventify.backend.exception.ResourceAlreadyExistsException;
import pl.eventify.backend.exception.BadCredentialsException;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.User;
import pl.eventify.backend.repository.UserRepository;

/**
 * Serwis do obsługi użytkowników: rejestracja, uwierzytelnianie i pobieranie danych.
 */
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Rejestracja użytkownika: normalizacja email, sprawdzenie unikalności,
     * hashowanie hasła oraz zapis do bazy. Zwraca obiekt UserDto.
     */
    public UserDto register(String name, String email, String rawPassword) {
        String normalizedEmail = email.trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ResourceAlreadyExistsException("User", "email", normalizedEmail);
        }
        String hashed = passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setName(name);
        user.setEmail(normalizedEmail);
        user.setPassword(hashed);
        User saved = userRepository.save(user);
        return UserDto.from(saved);
    }

    /**
     * Uwierzytelnianie: normalizacja email i weryfikacja hasła.
     * Rzuca BadCredentialsException przy nieudanym logowaniu.
     */
    @Transactional(readOnly = true)
    public void authenticate(String email, String rawPassword) {
        String normalizedEmail = email.trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(BadCredentialsException::new);
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new BadCredentialsException();
        }
    }

    /**
     * Pobranie użytkownika po ID jako UserDto. Rzuca 404, jeśli nie znaleziono.
     */
    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return UserDto.from(user);
    }

    /**
     * Pobranie użytkownika po emailu jako UserDto. Normalizacja email i sprawdzenie.
     */
    @Transactional(readOnly = true)
    public UserDto getUserByEmail(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", normalizedEmail));
        return UserDto.from(user);
    }
}
