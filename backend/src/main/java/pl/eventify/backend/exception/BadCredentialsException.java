package pl.eventify.backend.exception;

/**
 * Wyjątek zgłaszany przy nieudanej próbie logowania (błędny email lub hasło).
 */
public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException() {
        super("Niepoprawny email lub hasło");
    }
}
