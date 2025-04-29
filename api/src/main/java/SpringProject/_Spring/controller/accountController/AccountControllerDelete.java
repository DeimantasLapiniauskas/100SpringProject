package SpringProject._Spring.controller.accountController;

import SpringProject._Spring.controller.BaseController;
import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.service.authentication.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AccountControllerDelete extends BaseController {

    private final AccountService accountService;

    @Autowired
    public AccountControllerDelete(AccountService accountService) {
        this.accountService = accountService;
    }

    @Operation(summary = "Delete account", description = "Deletes account by its unique ID")
    @DeleteMapping("/accounts/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteAccount(@PathVariable long id) {
        accountService.deleteAccount(id);

        return noContent();
    }
}
