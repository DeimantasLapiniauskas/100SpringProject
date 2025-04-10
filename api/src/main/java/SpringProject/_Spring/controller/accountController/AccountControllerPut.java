package SpringProject._Spring.controller.accountController;


import SpringProject._Spring.controller.BaseController;
import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.authentication.client.ClientUpdateResponseDTO;
import SpringProject._Spring.dto.authentication.password.PasswordUpdateDTO;
import SpringProject._Spring.dto.authentication.password.PasswordUpdateMapper;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.dto.authentication.vet.VetUpdateRequestDTO;
import SpringProject._Spring.dto.authentication.vet.VetUpdateResponseDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import SpringProject._Spring.dto.authentication.client.ClientUpdateDTO;

@RestController
@RequestMapping("/api")
public class AccountControllerPut extends BaseController {

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
    public ResponseEntity<ApiResponse<String>> updateAccountPassword(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, Authentication authentication) {

        Account accountFromDB = accountService.findAccountById(((Account) authentication.getPrincipal()).getId()).get();

        PasswordUpdateMapper.updatePasswordFromDTO(passwordUpdateDTO, accountFromDB);

        accountFromDB.setPassword(passwordEncoder.encode(accountFromDB.getPassword()));

        accountService.saveAccount(accountFromDB);

        return ok("You have successfully updated your password!");
    }

    @Operation(summary = "Changes password by ID (Admin)", description = "Admin changes Client or Vet password by their unique ID")
    @PutMapping("/account/password/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Object>> updateAccountPasswordAdmin(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO, @PathVariable long id) {
        if(!accountService.existsAccountById(id)){
            return notFound("Account not found!");
        }
        Account accountFromDB = accountService.findAccountById(id).get();

        if (accountFromDB.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().contains("ROLE_ADMIN"))) {
            return badRequest(id,"You can't change password of another admin!");
        }

        PasswordUpdateMapper.updatePasswordFromDTO(passwordUpdateDTO, accountFromDB);

        accountFromDB.setPassword(passwordEncoder.encode(accountFromDB.getPassword()));

        accountService.saveAccount(accountFromDB);

        return ok("You have successfully updated password for account " + id);
    }

    @Operation(summary = "Edit vet information", description = "Edit vet information (except password and email")
    @PutMapping("/vet/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<VetUpdateResponseDTO>> updateVet(@Valid @RequestBody VetUpdateRequestDTO vetUpdateRequestDTO, @PathVariable long id) {
        if (!vetService.existsVetById(id)) {
            return notFound("Vet account not found!");
        }

        Vet vetFromDB = vetService.getVetById(id).get();

        VetMapping.updateVetFromDTO(vetFromDB, vetUpdateRequestDTO);

        vetService.updateVet(vetFromDB);

        return ok(VetMapping.toVetUpdateResponseDTO(vetFromDB));
    }

    @Operation(summary = "Edit client information", description = "Edit client information (except password and email)")
    @PutMapping("/client/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ClientUpdateResponseDTO>> updateClient(@Valid @RequestBody ClientUpdateDTO clientUpdateDTO, @PathVariable long id) {
        if (!clientService.existsClientById(id)) {
            return notFound("Client account not found!");
        }

        Client clientFromDB = clientService.findClientById(id).get();

        ClientMapping.updateClientFromDTO(clientFromDB, clientUpdateDTO);

        clientService.updateClient(clientFromDB);

        return ok(ClientMapping.toClientUpdateResponseDTO(clientFromDB));
    }
}