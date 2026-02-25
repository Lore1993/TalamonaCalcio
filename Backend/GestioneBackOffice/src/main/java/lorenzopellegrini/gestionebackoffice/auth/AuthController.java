package lorenzopellegrini.gestionebackoffice.auth;

import lombok.RequiredArgsConstructor;
import lorenzopellegrini.gestionebackoffice.config.AdminProperties;
import lorenzopellegrini.gestionebackoffice.jwt.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminProperties adminProperties;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        if (request.getUsername().equals(adminProperties.getUsername()) &&
                request.getPassword().equals(adminProperties.getPassword())) {

            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Credenziali non valide");
    }
}