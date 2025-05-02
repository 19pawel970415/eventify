package pl.eventify.backend.exception;

public class AlreadyLikedException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AlreadyLikedException(Long userId, Long eventId) {
        super(String.format("Użytkownik o id=%d już polubił wydarzenie o id=%d", userId, eventId));
    }
}
