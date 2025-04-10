package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.authentication.client.ClientMapping;

import SpringProject._Spring.dto.authentication.client.ClientResponseDTO;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.dto.authentication.vet.VetResponseDTO;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ClientAndVetGetControler extends BaseController{
  private final ClientService clientService;
  private final VetService vetService;

  @Autowired
  public ClientAndVetGetControler(ClientService clientService, VetService vetService) {
    this.clientService = clientService;
    this.vetService = vetService;
  }

  @Operation(summary = "Get by ID", description = "Retrieves by it's unique ID")
  @GetMapping("/client/{email}")
  public ResponseEntity<ApiResponse<ClientResponseDTO>> getClient(@PathVariable String email) {

    long id = clientService.findClientIdByEmail(email);

    Optional<Client> client = clientService.findClientById(id);

    if (client.isEmpty()) {
      return notFound("Service not found");
    }

    Client serviceAtClinicFromDB = client.get();

    return ok(ClientMapping.toClientResponseDTO(serviceAtClinicFromDB));
  }

//  @Operation(summary = "Get by ID", description = "Retrieves by it's unique ID")
  @GetMapping("/vet/{email}")
  public ResponseEntity<ApiResponse<VetResponseDTO>> getVet(@PathVariable String email) {



    Optional<Vet> vet = vetService.findVetByAccountEmail(email);

    if (vet.isEmpty()) {
      return notFound("Service not found");
    }

    Vet serviceAtClinicFromDB = vet.get();

    return ok(VetMapping.toVetResponseDTO(serviceAtClinicFromDB));
  }
}
