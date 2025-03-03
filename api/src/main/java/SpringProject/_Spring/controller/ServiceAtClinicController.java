package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ServiceAtClinicDTO;
import SpringProject._Spring.dto.ServiceAtClinicMapper;
import SpringProject._Spring.dto.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.service.ServiceAtClinicService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ServiceAtClinicController {
    private final ServiceAtClinicService serviceAtClinicService;

    @Autowired

    public ServiceAtClinicController(ServiceAtClinicService service) {
        this.serviceAtClinicService = service;
    }

    @PostMapping("/services")
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

        ServiceAtClinicDTO newService = ServiceAtClinicMapper.toServiceAtClinicDTO(serviceAtClinicService.saveService(service));

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(newService.id())
                                .toUri())
                .body(newService);

    }
}
