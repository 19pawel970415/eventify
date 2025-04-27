package pl.eventify.backend.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import pl.eventify.backend.service.JwtService;

import java.io.IOException;

@Component
public class JwtFilter extends HttpFilter {

    private final JwtService jwtService;

    public JwtFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7); // Wytnij "Bearer "

            // Tu możemy sobie np. zweryfikować token, ale na razie tylko sprawdzimy czy jest OK
            if (jwtService.validateToken(token)) {
                // Token jest poprawny - w prawdziwej aplikacji ustawilibyśmy SecurityContext
                // U nas na razie tylko puszczamy dalej
            } else {
                // Jeśli token jest niepoprawny, można ewentualnie zakończyć request od razu:
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        // Jeśli brak tokena lub token poprawny, idziemy dalej
        chain.doFilter(request, response);
    }
}
