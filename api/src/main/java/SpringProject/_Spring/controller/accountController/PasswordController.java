package SpringProject._Spring.controller.accountController;

import SpringProject._Spring.controller.BaseController;
import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.authentication.password.PasswordUpdateDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.service.authentication.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PasswordController extends BaseController {

    private final AccountService accountService;

    @Autowired
    public PasswordController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/verify-password")
    public ResponseEntity<ApiResponse<String>> verifyPassword(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, Authentication authentication) {


        String password = passwordUpdateDTO.newPassword();
        Optional<Account> accountOpt = accountService.findByEmail(authentication.getName());
        if (accountOpt.isEmpty()) {
            return unAuthorized("You are not Authenticated");
        }

        Account account = accountOpt.get();
        boolean isValidPassword = accountService.verifyAccountPassword(account, password);
        if (!isValidPassword) {
            return forbidden("Incorrect password");
        }

        return ok(null, "Password verified");
    }
}
