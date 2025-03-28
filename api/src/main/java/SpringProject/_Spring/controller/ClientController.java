package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.authentication.client.ClientMapping;
import SpringProject._Spring.dto.authentication.client.ClientPageResponseDTO;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.service.authentication.ClientService;
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
@RequestMapping("/api")
public class ClientController extends BaseController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @Operation(summary = "Get clients for admin page (Admin)", description = "Retrieves all clients and splits the list by pages")
    @GetMapping("/client/pagination")
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
}
