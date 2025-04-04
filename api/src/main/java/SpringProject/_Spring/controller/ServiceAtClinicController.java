package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.service.ServiceAtClinicPageResponseDTO;
import SpringProject._Spring.dto.service.ServiceAtClinicResponseDTO;
import SpringProject._Spring.dto.service.ServiceAtClinicMapper;
import SpringProject._Spring.dto.service.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.service.ServiceAtClinicService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ServiceAtClinicController extends BaseController {
    private final ServiceAtClinicService serviceAtClinicService;

    @Autowired
    public ServiceAtClinicController(ServiceAtClinicService service) {
        this.serviceAtClinicService = service;
    }

    @Operation(summary = "Add new service", description = "Adds a new service to the database")
    @PostMapping("/services")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<ServiceAtClinicResponseDTO>> addService(@Valid @RequestBody ServiceAtClinicRequestDTO serviceDTO) {
        if (serviceAtClinicService.existsServiceByName(serviceDTO.name())) {

            return badRequest(null, "Services already exist");
        }

        ServiceAtClinic service = new ServiceAtClinic();
        service.setName(serviceDTO.name());
        service.setDescription(serviceDTO.description());
        service.setPrice(serviceDTO.price());

        ServiceAtClinicResponseDTO newService = ServiceAtClinicMapper.toServiceAtClinicDTO(serviceAtClinicService.saveService(service));

        return created(newService, "Service created successfully");

    }

    @Operation(summary = "Get all services", description = "Retrieves a list of all services")
    @GetMapping("/services")
    public ResponseEntity<?> getAllServices() {

        List<ServiceAtClinic> allServices = serviceAtClinicService.findAllServiceAtClinic();

        if (allServices.isEmpty()) {
            return noContent();
        }

        return ResponseEntity.ok(ServiceAtClinicMapper.toServiceAtClinicListDTO(allServices));
    }

    @Operation(summary = "Get service by ID", description = "Retrieves a service by it's unique ID")
    @GetMapping("/services/{serviceId}")
    public ResponseEntity<ApiResponse<ServiceAtClinicResponseDTO>> getService(@PathVariable long serviceId) {

        if (serviceId < 0) {
            return badRequest(null, "Service ID cannot be negative");
        }

        Optional<ServiceAtClinic> serviceAtClinicOpt = serviceAtClinicService.findServiceAtClinicById(serviceId);

        if (serviceAtClinicOpt.isEmpty()) {
            return notFound("Service not found");
        }

        ServiceAtClinic serviceAtClinicFromDB = serviceAtClinicOpt.get();

        return ok(ServiceAtClinicMapper.toServiceAtClinicDTO(serviceAtClinicFromDB));
    }

    @Operation(summary = "Update service by ID (Vet and Admin)", description = "Updates a service by it's unique ID")
    @PutMapping("/services/{serviceId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<ServiceAtClinicResponseDTO>> updateService(@PathVariable long serviceId,
                                                                                 @Valid @RequestBody ServiceAtClinicRequestDTO serviceAtClinicRequestDTO) {
        if (serviceId < 0) {
            return badRequest(null, "Service ID cannot be negative");
        }

        Optional<ServiceAtClinic> serviceAtClinicOpt = serviceAtClinicService.findServiceAtClinicById(serviceId);

        if (serviceAtClinicOpt.isEmpty()) {
            return notFound("Service not found");
        }

        ServiceAtClinic serviceAtClinicFromDB = serviceAtClinicOpt.get();
        ServiceAtClinic updatedService = ServiceAtClinicMapper.updateServiceAtClinic(serviceAtClinicRequestDTO, serviceAtClinicFromDB);
        serviceAtClinicService.saveService(updatedService);

        return ok(ServiceAtClinicMapper.toServiceAtClinicDTO(updatedService), "Service updated successfully");
    }

    @Operation(summary = "Delete service by ID (Vet and Admin)", description = "Deletes a service by it's unique ID")
    @DeleteMapping("/services/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")

    public ResponseEntity<ApiResponse<String>> deleteService(@PathVariable long id) {
        if (!serviceAtClinicService.existsServiceById(id)) {
            return notFound("Service not found");
        }
        serviceAtClinicService.deleteServiceById(id);
//        return noContent("service deleted successfully");
        return noContent();
    }

    @Operation(summary = "Get all services and split them by pages", description = "Retrieves a list of all services and splits them by pages")
    @GetMapping("/services/pagination")
    public ResponseEntity<ApiResponse<ServiceAtClinicPageResponseDTO>> getAllServiceAtClinicPage(@RequestParam int page, @RequestParam int size, @RequestParam(required = false) String sort) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && serviceAtClinicService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        Page<ServiceAtClinic> pagedServices = serviceAtClinicService.findAllServiceAtClinicPages(page, size, sort);
        String message = pagedServices.isEmpty() ? "Service list is empty" : null;
        ServiceAtClinicPageResponseDTO serviceAtClinicPageResponseDTO = ServiceAtClinicMapper.toServiceAtClinicListPageDTO(pagedServices);

        return ok(serviceAtClinicPageResponseDTO, message);
    }
}

