package pl.eventify.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.eventify.backend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
