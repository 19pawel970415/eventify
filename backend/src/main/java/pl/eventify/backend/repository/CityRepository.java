package pl.eventify.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eventify.backend.model.City;

public interface CityRepository extends JpaRepository<City, Long> {
}
