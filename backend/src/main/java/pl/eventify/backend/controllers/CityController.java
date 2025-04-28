package pl.eventify.backend.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.eventify.backend.dto.EventDto;
import pl.eventify.backend.model.City;
import pl.eventify.backend.service.CityService;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/cities")

public class CityController {


        private final CityService cityService;

        public CityController(CityService cityService) {
            this.cityService = cityService;
        }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityService.getAllCities();
        return ResponseEntity.ok(cities);
    }
}
