package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.authentication.vet.VetPageResponseDTO;
import SpringProject._Spring.dto.vet.VetMapping;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.authentication.VetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class VetController extends BaseController {

    private final VetService vetService;

    @Autowired
    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    //@Operation(summary = "Get pets by owner ID and split them by pages (Client and Admin)", description = "Retrieves all pets owned by client by his ID and splits the list by pages")
    @GetMapping("/client/pagination")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<VetPageResponseDTO>> getAllPostsPage(@RequestParam int page,
                                                                           @RequestParam int size,
                                                                           @RequestParam(required = false) String sort) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Page<Vet> pagedVets = vetService.findAllPetsPage(page, size, sort);
        String message = pagedVets.isEmpty() ? "Vey list is empty" : null;
        VetPageResponseDTO responseDTO = VetMapping.toVetPageResponseDTO(pagedVets);

        return ok(responseDTO, message);
    }
}
