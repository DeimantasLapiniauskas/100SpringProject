package SpringProject._Spring.controller.accountController;


import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.authentication.password.PasswordUpdateDTO;
import SpringProject._Spring.dto.authentication.password.PasswordUpdateMapper;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.dto.authentication.vet.VetUpdateRequestDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import SpringProject._Spring.dto.authentication.client.ClientUpdateDTO;

@RestController
@RequestMapping("/api")
public class AccountControllerPut {

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final VetService vetService;
    private final ClientService clientService;

    @Autowired
    public AccountControllerPut(AccountService accountService, PasswordEncoder passwordEncoder, VetService vetService, ClientService clientService) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
        this.vetService = vetService;
        this.clientService = clientService;
    }

    @Operation(summary = "Change current account password", description = "Changes currently authenticated account password")
    @PutMapping("/account/password")
    public ResponseEntity<?> updateAccountPassword(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, Authentication authentication) {

        Account accountFromDB = accountService.findAccountById(((Account) authentication.getPrincipal()).getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found!"));

        PasswordUpdateMapper.updatePasswordFromDTO(passwordUpdateDTO, accountFromDB);

        accountFromDB.setPassword(passwordEncoder.encode(accountFromDB.getPassword()));

        accountService.saveAccount(accountFromDB);

        return ResponseEntity.status(HttpStatus.OK).body("You have successfully updated your password!");
    }

    @Operation(summary = "Changes password by ID (Admin)", description = "Admin changes Client or Vet password by their unique ID")
    @PutMapping("/account/password/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateAccountPasswordAdmin(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, @PathVariable long id) {
        Account accountFromDB = accountService.findAccountById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found!"));

        if (accountFromDB.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().contains("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can't change password of another admin!");
        }

        PasswordUpdateMapper.updatePasswordFromDTO(passwordUpdateDTO, accountFromDB);

        accountFromDB.setPassword(passwordEncoder.encode(accountFromDB.getPassword()));

        accountService.saveAccount(accountFromDB);

        return ResponseEntity.status(HttpStatus.OK).body("You have successfully updated password for account " + id);
    }

    @Operation(summary = "Edit vet information", description = "Edit vet information (except password and email")
    @PutMapping("/vet/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateVet(@Valid @RequestBody VetUpdateRequestDTO vetUpdateRequestDTO, @PathVariable long id) {
        if (!vetService.existsVetById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vet account not found!");
        }

        Vet vetFromDB = vetService.getVetById(id).get();

        VetMapping.updateVetFromDTO(vetFromDB, vetUpdateRequestDTO);

        vetService.updateVet(vetFromDB);

        return ResponseEntity.ok(VetMapping.toVetUpdateResponseDTO(vetFromDB));
    }

    @Operation(summary = "Edit client information", description = "Edit client information (except password and email)")
    @PutMapping("/client/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateClient(@Valid @RequestBody ClientUpdateDTO clientUpdateDTO, @PathVariable long id) {
        if (!clientService.existsClientById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client account not found!");
        }

        Client clientFromDB = clientService.findClientById(id).get();

        ClientMapping.updateClientFromDTO(clientFromDB, clientUpdateDTO);

        clientService.updateClient(clientFromDB);

        return ResponseEntity.ok(ClientMapping.toClientUpdateResponseDTO(clientFromDB));
    }
}
