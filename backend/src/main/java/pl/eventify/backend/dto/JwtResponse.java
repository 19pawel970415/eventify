package pl.eventify.backend.dto;

/**
 * Wrapper na token JWT zwracany klientowi.
 */
public class JwtResponse {
    private String token;
    private String tokenType = "Bearer";

    public JwtResponse() { }

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }
}
