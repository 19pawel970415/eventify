package pl.eventify.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.eventify.backend.dto.UserDto;
import pl.eventify.backend.exception.ResourceAlreadyExistsException;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.User;
import pl.eventify.backend.repository.UserRepository;

import java.time.Instant;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

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
        user.setCreatedAt(Instant.now());
        User saved = userRepository.save(user);
        return UserDto.from(saved);
    }

    @Transactional(readOnly = true)
    public UserDto findByEmail(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", normalizedEmail));
        return UserDto.from(user);
    }
}
