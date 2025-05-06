package pl.eventify.backend.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.eventify.backend.dto.JwtResponse;
import pl.eventify.backend.dto.LoginRequestDto;
import pl.eventify.backend.dto.RegisterRequestDto;
import pl.eventify.backend.dto.UserDto;
import pl.eventify.backend.exception.BadCredentialsException;
import pl.eventify.backend.service.JwtService;
import pl.eventify.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequestDto dto) {
        UserDto userDto = userService.register(dto.getName(), dto.getEmail(), dto.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@Valid @RequestBody LoginRequestDto dto) {
        String email = dto.getEmail().trim().toLowerCase();
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, dto.getPassword())
            );
            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            String token = jwtService.generateToken(userDetails.getUsername());

            UserDto userDto = userService.findByEmail(email);

            return ResponseEntity.ok(new JwtResponse(token, userDto.getId(), userDto.getName()));
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException();
        }
    }
}
