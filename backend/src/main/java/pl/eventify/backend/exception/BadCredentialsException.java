package pl.eventify.backend.exception;

public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException() {
        super("Niepoprawny email lub hasło");
    }
}
