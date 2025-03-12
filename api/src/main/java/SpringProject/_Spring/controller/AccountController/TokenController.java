package SpringProject._Spring.controller.AccountController;

import SpringProject._Spring.model.Account;
import SpringProject._Spring.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class TokenController {

    private final JwtEncoder encoder;
    private final AccountRepository accountRepository;

    @Autowired
    public TokenController(JwtEncoder encoder, AccountRepository accountRepository) {
        this.encoder = encoder;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/token")
    public String token(Authentication authentication) {
        Instant now = Instant.now();
        long expiry = 10L;

        String email = authentication.getName();

        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found!"));

        String scope = authentication.getAuthorities().stream()
                .map(s -> s.getAuthority())
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(email)
                .claim("account_id", account.getId())
                .claim("scope", scope)
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
