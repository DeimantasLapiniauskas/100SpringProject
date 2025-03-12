package SpringProject._Spring.controller;

import SpringProject._Spring.dto.service.ServiceAtClinicResponseDTO;
import SpringProject._Spring.dto.service.ServiceAtClinicMapper;
import SpringProject._Spring.dto.service.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.service.ServiceAtClinicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ServiceAtClinicController {
    private final ServiceAtClinicService serviceAtClinicService;

    @Autowired
    public ServiceAtClinicController(ServiceAtClinicService service) {
        this.serviceAtClinicService = service;
    }

    @PostMapping("/services")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<?> addService(@Valid @RequestBody ServiceAtClinicRequestDTO serviceDTO) {
        if (serviceAtClinicService.existsServiceByName(serviceDTO.name())) {
            Map<String, String> badResponse = new HashMap<>();
            badResponse.put("service", "already exists");
            return ResponseEntity.badRequest().body(badResponse);
        }

        ServiceAtClinic service = new ServiceAtClinic();
        service.setName(serviceDTO.name());
        service.setDescription(serviceDTO.description());
        service.setPrice(serviceDTO.price());

        ServiceAtClinicResponseDTO newService = ServiceAtClinicMapper.toServiceAtClinicDTO(serviceAtClinicService.saveService(service));

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(newService.id())
                                .toUri())
                .body(newService);

    }

    @GetMapping("/services")
    public ResponseEntity<?> getAllServices() {

        List<ServiceAtClinic> allServices = serviceAtClinicService.findAllServiceAtClinic();

        if (allServices.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Service list is empty");
        }

        return ResponseEntity.ok(ServiceAtClinicMapper.toServiceAtClinicListDTO(allServices));
    }

    @GetMapping("/services/{serviceId}")
    public ResponseEntity<?> getService(@PathVariable long serviceId) {

        if (serviceId < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Service ID cannot be negative");
        }

        Optional<ServiceAtClinic> serviceAtClinicOpt = serviceAtClinicService.findServiceAtClinicById(serviceId);

        if (serviceAtClinicOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
        }

        ServiceAtClinic serviceAtClinicFromDB = serviceAtClinicOpt.get();

        return ResponseEntity.ok(ServiceAtClinicMapper.toServiceAtClinicDTO(serviceAtClinicFromDB));
    }

    @PutMapping("/services/{serviceId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET') or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> updateService(@PathVariable long serviceId,
                                           @Valid @RequestBody ServiceAtClinicRequestDTO serviceAtClinicRequestDTO) {
        if (serviceId < 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Service ID cannot be negative");
        }

        Optional<ServiceAtClinic> serviceAtClinicOpt = serviceAtClinicService.findServiceAtClinicById(serviceId);

        if (serviceAtClinicOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
        }

        ServiceAtClinic serviceAtClinicFromDB = serviceAtClinicOpt.get();
        ServiceAtClinic updatedService = ServiceAtClinicMapper.updateServiceAtClinic(serviceAtClinicRequestDTO, serviceAtClinicFromDB);

        serviceAtClinicService.saveService(updatedService);

        return ResponseEntity.ok(ServiceAtClinicMapper.toServiceAtClinicDTO(updatedService));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<String> deleteService(@PathVariable long id) {
        if (!serviceAtClinicService.existsServiceById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found");
        }
        serviceAtClinicService.deleteServiceById(id);
        return ResponseEntity.noContent().build();
    }
}

