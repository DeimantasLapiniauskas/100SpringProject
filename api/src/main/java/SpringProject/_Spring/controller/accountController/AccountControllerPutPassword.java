//package SpringProject._Spring.controller.AccountController;
//
//import SpringProject._Spring.controller.BaseController;
//import SpringProject._Spring.dto.password.PasswordUpdateDTO;
//import SpringProject._Spring.dto.password.PasswordUpdateMapper;
//import SpringProject._Spring.model.Account;
//import SpringProject._Spring.service.AccountService;
//import io.swagger.v3.oas.annotations.Operation;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//@RestController
//@RequestMapping("/api")
//public class AccountControllerPutPassword extends BaseController  {
//
//    private final AccountService accountService;
//    private final PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AccountControllerPutPassword(AccountService accountService, PasswordEncoder passwordEncoder) {
//        this.accountService = accountService;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Operation(summary = "Change current client password", description = "Changes currently authenticated client password")
//    @PutMapping("/account/password")
//    public ResponseEntity<?> updateAccountPassword(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, Authentication authentication) {
//
//        Account accountFromDB = accountService.findAccountById(((Account) authentication.getPrincipal()).getId())
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found!"));
//
//        PasswordUpdateMapper.updatePasswordFromDTO(passwordUpdateDTO, accountFromDB);
//
//        accountFromDB.setPassword(passwordEncoder.encode(accountFromDB.getPassword()));
//
//        accountService.saveAccount(accountFromDB);
//
//        return ResponseEntity.status(HttpStatus.OK).body("You have successfully updated your password!");
//    }
//
//    @Operation(summary = "Changes password by ID (Admin)", description = "Admin changes Client or Vet password by their unique ID")
//    @PutMapping("/account/password/{id}")
//    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
//    public ResponseEntity<?> updateAccountPasswordAdmin(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, @PathVariable long id) {
//        Account accountFromDB = accountService.findAccountById(id)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found!"));
//
//        PasswordUpdateMapper.updatePasswordFromDTO(passwordUpdateDTO, accountFromDB);
//
//        accountFromDB.setPassword(passwordEncoder.encode(accountFromDB.getPassword()));
//
//        accountService.saveAccount(accountFromDB);
//
//        return ResponseEntity.status(HttpStatus.OK).body("You have successfully updated password for account " + id);
//    }
//}
