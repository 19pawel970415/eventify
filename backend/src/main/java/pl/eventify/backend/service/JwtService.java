package pl.eventify.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    // Klucz do podpisywania tokenów (w prawdziwym projekcie trzymalibyśmy go w zmiennych środowiskowych!)
    private static final String SECRET_KEY = "eventify_secret_key_123";

    // Czas ważności tokena (np. 24 godziny)
    private static final long EXPIRATION_TIME_MS = 1000 * 60 * 60 * 24;

    /**
     * Generuje token JWT dla danego e-maila.
     */
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    /**
     * Pobiera e-mail (subject) z tokena.
     */
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Sprawdza, czy token jest poprawny (ważny i nieprzeterminowany).
     */
    public boolean validateToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Pomocnicza metoda do wydobycia pełnych claimów z tokena.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}