package SpringProject._Spring.controller.accountController;


import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.authentication.client.ClientRequestDTO;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.dto.authentication.vet.VetRequestDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Role;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountControllerPost {

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final ClientService clientService;
    private final VetService vetService;

    @Autowired
    public AccountControllerPost(AccountService accountService, PasswordEncoder passwordEncoder, ClientService clientService, VetService vetService) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
        this.clientService = clientService;
        this.vetService = vetService;
    }

    @Operation(summary = "Register new client", description = "Registers a new client")
    @PostMapping("/register")
    @PreAuthorize("isAnonymous()")
    public ResponseEntity<?> addClient(@Valid @RequestBody ClientRequestDTO clientRequestDTO) {
        if (accountService.existsAccountByEmail(clientRequestDTO.email())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("This email is already registered. Please try logging in.");
        }

        Client client = ClientMapping.toClient(clientRequestDTO);

        Client savedClient = clientService.saveClient(new Account(clientRequestDTO.email(),
                passwordEncoder.encode(clientRequestDTO.password()),
                List.of(new Role("CLIENT", 3))), client);

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(savedClient.getAccountId())
                                .toUri())
                .body(ClientMapping.toClientResponseDTO(savedClient));
    }

    @Operation(summary = "Register new veterinarian (Admin)", description = "Admin registers a new veterinarian")
    @PostMapping("/registerVet")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> addVet(
            Authentication authentication,
            @Valid @RequestBody VetRequestDTO vetRequestDTO) {

        if (accountService.existsAccountByEmail(vetRequestDTO.email())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("This email is already registered. Please try logging in.");
        }

        Vet vet = VetMapping.toVet(vetRequestDTO);


        Vet savedVet = vetService.saveVet(new Account(vetRequestDTO.email(),
                passwordEncoder.encode(vetRequestDTO.password()),
                List.of(new Role("VET", 2))), vet);

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(savedVet.getAccountId())
                                .toUri())
                .body(VetMapping.toVetResponseDTO(savedVet));
    }
}
