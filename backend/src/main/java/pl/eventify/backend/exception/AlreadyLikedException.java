package pl.eventify.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class AlreadyLikedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AlreadyLikedException(Long userId, Long eventId) {
        super(String.format("Użytkownik o id=%d już polubił wydarzenie o id=%d", userId, eventId));
    }
}

