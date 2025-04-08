package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.authentication.client.ClientPageResponseDTO;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.dto.authentication.vet.VetPageResponseDTO;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adminpage")
public class AdminpageController extends BaseController {

    private final ClientService clientService;
    private final VetService vetService;

    @Autowired
    public AdminpageController(ClientService clientService, VetService vetService) {
        this.clientService = clientService;
        this.vetService = vetService;
    }

    @Operation(summary = "Get clients for admin page (Admin)", description = "Retrieves all clients and splits the list by pages")
    @GetMapping("/clients/pagination")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ClientPageResponseDTO>> getAllClientsPage(@RequestParam int page,
                                                                                @RequestParam int size,
                                                                                @RequestParam(required = false) String sort) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Page<Client> pagedClients = clientService.findAllClientsPage(page, size, sort);
        String message = pagedClients.isEmpty() ? "Client list is empty" : null;
        ClientPageResponseDTO responseDTO = ClientMapping.toClientPageResponseDTO(pagedClients);

        return ok(responseDTO, message);
    }

    @Operation(summary = "Get vets for admin page (Admin)", description = "Retrieves all vets and splits the list by pages")
    @GetMapping("/vets/pagination")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<VetPageResponseDTO>> getAllVetsPage(@RequestParam int page,
                                                                          @RequestParam int size,
                                                                          @RequestParam(required = false) String sort) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Page<Vet> pagedVets = vetService.findAllVetsPage(page, size, sort);
        String message = pagedVets.isEmpty() ? "Vet list is empty" : null;
        VetPageResponseDTO responseDTO = VetMapping.toVetPageResponseDTO(pagedVets);

        return ok(responseDTO, message);
    }
}
