package SpringProject._Spring.controller;


import SpringProject._Spring.dto.appointment.AppointmentMapping;
import SpringProject._Spring.dto.appointment.AppointmentRequestDTO;
import SpringProject._Spring.dto.appointment.AppointmentResponseDTO;
import SpringProject._Spring.dto.appointment.AppointmentUpdateDTO;
import SpringProject._Spring.dto.appointment.vet.VetAppointmentMapping;
import SpringProject._Spring.dto.appointment.vet.VetAppointmentResponseDTO;
import SpringProject._Spring.dto.pet.PetMapping;
import SpringProject._Spring.dto.service.ServiceAtClinicMapper;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.service.*;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppointmentController extends BaseController {
    private final AppointmentService appointmentService;
    private final PetService petService;
    private final ServiceAtClinicService serviceService;
    private final VetService vetService;
    private final ClientService clientService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, PetService petService, ServiceAtClinicService serviceService, VetService vetService, ClientService clientService) {
        this.appointmentService = appointmentService;
        this.petService = petService;
        this.serviceService = serviceService;
        this.vetService = vetService;
        this.clientService = clientService;
    }

    @Operation(summary = "Create new appointment", description = "Creates an appointment for a pet with selected vet")
    @PostMapping("/appointments")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addAppointment(@Valid @RequestBody AppointmentRequestDTO appointmentDTO) {
        if (appointmentDTO.serviceIds().stream()
                .anyMatch(appointmentId -> appointmentService.existsByPetIdAndServiceId(
                                appointmentDTO.petId(), appointmentId
                        )
                )
        ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Your pet is already registered to this service!");
        }

        Appointment savedAppointment = appointmentService.saveAppointment(
                AppointmentMapping.toAppointment(appointmentDTO,
                        appointmentDTO.serviceIds().stream().map(id -> serviceService.findServiceAtClinicById(id).get()).toList()
                )
        );


        return ResponseEntity.status(HttpStatus.CREATED).body(
                new AppointmentResponseDTO(
                        savedAppointment.getId(),
                        PetMapping.toPetResponseDTO(petService.getPetById(savedAppointment.getPetId()).get()),
                        VetMapping.toVetResponseDTO(vetService.getVetById(savedAppointment.getVetId()).get()),
                        savedAppointment.getServices().stream().map(ServiceAtClinicMapper::toServiceAtClinicDTO).toList(),
                        savedAppointment.getAppointmentDate(),
                        savedAppointment.getNotes(),
                        savedAppointment.getTotalServicesSum(),
                        savedAppointment.getStatus())
        );
    }

    @Operation(summary = "Update an appointment", description = "Updates an appointment by its unique ID")
    @PutMapping("/appointments/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<String> putAppointment(@PathVariable long id,
                                                 @RequestBody AppointmentUpdateDTO updateDTO) {
        if (updateDTO.newDate().isEmpty() && updateDTO.status().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can't call this endpoint and then not give a date OR status!");
        }
        if (!appointmentService.existsAppointmentById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found!");
        }

        Appointment appointmentFromDB = appointmentService.getAppointmentById(id).get();
        updateDTO.status().ifPresent(appointmentFromDB::setStatus);
        updateDTO.newDate().ifPresent(appointmentFromDB::setAppointmentDate);
        appointmentService.saveAppointment(appointmentFromDB);
        return ResponseEntity.ok("Appointment updated its " +
                (updateDTO.status().isPresent() ? updateDTO.newDate().isPresent() ? "status and date " : "status " : "date ")
                + "successfully!");
    }

    @Operation(summary = "Get all appointments for current client", description = "Retrieves all appointments for currently authenticated client")
    @GetMapping("/appointments")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<List<AppointmentResponseDTO>> getOwnAppointments(Authentication authentication) {
        return ResponseEntity.ok(
                appointmentService.getAllAppointmentsByClientId(clientService.findClientIdByEmail(authentication.getName()))
                        .stream().map(appointment -> new AppointmentResponseDTO(
                                appointment.getId(),
                                PetMapping.toPetResponseDTO(petService.getPetById(appointment.getPetId()).get()),
                                VetMapping.toVetResponseDTO(vetService.getVetById(appointment.getVetId()).get()),
                                appointment.getServices().stream().map(ServiceAtClinicMapper::toServiceAtClinicDTO).toList(),
                                appointment.getAppointmentDate(),
                                appointment.getNotes(),
                                appointment.getTotalServicesSum(),
                                appointment.getStatus()))
                        .toList());
    }

    @Operation(summary = "Get appointment by ID (Admin)", description = "Retrieves an appointment by it's unique ID")
    @GetMapping("/appointments/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<List<AppointmentResponseDTO>> getAdminAppointments(@PathVariable long id) {
        return ResponseEntity.ok(
                appointmentService.getAllAppointmentsByClientId(id)
                        .stream().map(appointment -> new AppointmentResponseDTO(
                                appointment.getId(),
                                PetMapping.toPetResponseDTO(petService.getPetById(appointment.getPetId()).get()),
                                VetMapping.toVetResponseDTO(vetService.getVetById(appointment.getVetId()).get()),
                                appointment.getServices().stream().map(ServiceAtClinicMapper::toServiceAtClinicDTO).toList(),
                                appointment.getAppointmentDate(),
                                appointment.getNotes(),
                                appointment.getTotalServicesSum(),
                                appointment.getStatus()))
                        .toList());
    }

    @Operation(summary = "Get vets list", description = "Retrieves a vet list (names, specialty)")
    @GetMapping("/vets")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<List<VetAppointmentResponseDTO>> getVeterinarians(){
        List<VetAppointmentResponseDTO> vetsDTO = vetService.getAllVets().stream().map(VetAppointmentMapping::toVetDTO).toList();
        return ResponseEntity.ok(vetsDTO);
    }
}
