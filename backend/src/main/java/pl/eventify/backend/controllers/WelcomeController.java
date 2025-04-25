package pl.eventify.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")  // pozwala frontendowi na zapytania
public class WelcomeController {

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Eventify";
    }
}
