package pl.eventify.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.eventify.backend.exception.ResourceNotFoundException;
import pl.eventify.backend.model.City;
import pl.eventify.backend.repository.CityRepository;

import java.util.List;

@Service
public class CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    /**
     * Pobierz wszystkie miasta.
     */
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    /**
     * Pobierz miasto po identyfikatorze.
     */
    public City getCityById(Long id) {
        return cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("City", "id", id));
    }

    /**
     * Utwórz nowe miasto.
     */
    public City createCity(City city) {
        return cityRepository.save(city);
    }

    /**
     * Zaktualizuj istniejące miasto.
     */
    public City updateCity(Long id, City cityDetails) {
        City city = getCityById(id);
        city.setName(cityDetails.getName());
        city.setState(cityDetails.getState());
        city.setCountry(cityDetails.getCountry());
        return cityRepository.save(city);
    }

    /**
     * Usuń miasto.
     */
    public void deleteCity(Long id) {
        City city = getCityById(id);
        cityRepository.delete(city);
    }
}
