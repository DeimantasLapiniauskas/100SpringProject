package SpringProject._Spring.controller.AccountController;

import SpringProject._Spring.dto.*;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class AccountControllerPublic {

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountControllerPublic(AccountService accountService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/account")
    public ResponseEntity<?> addAccount(@Valid @RequestBody AccountRequestDTO accountRequestDTO, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are already registered!");
        }
        if (accountService.existsAccountByEmail(accountRequestDTO.email())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email is already registered. Please try logging in.");
        }

        Account account = AccountRequestMapper.toAccount(accountRequestDTO);
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        Account savedAccount = accountService.saveAccount(account);

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(savedAccount.getId())
                                .toUri())
                .body(AccountResponseMapper.toAccountResponseDTO(savedAccount));
    }
}
