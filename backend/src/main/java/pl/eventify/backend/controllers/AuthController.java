package pl.eventify.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.eventify.backend.dto.AuthRequestDto;
import pl.eventify.backend.dto.UserDto;
import pl.eventify.backend.service.JwtService;
import pl.eventify.backend.service.UserService;
import pl.eventify.backend.model.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody AuthRequestDto dto) {
        // załóżmy, że dto.getName() jest wymagane
        User user = userService.register(dto.getName(), dto.getEmail(), dto.getPassword());
        UserDto userDto = UserDto.from(user);
        return ResponseEntity.status(201).body(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequestDto dto) {
        User user = userService.authenticate(dto.getEmail(), dto.getPassword());
        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }
}