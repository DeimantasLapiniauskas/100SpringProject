package SpringProject._Spring.controller;


import SpringProject._Spring.dto.appointment.AppointmentMapping;
import SpringProject._Spring.dto.appointment.AppointmentRequestDTO;
import SpringProject._Spring.dto.appointment.AppointmentResponseDTO;
import SpringProject._Spring.model.Appointment;
import SpringProject._Spring.repository.AppointmentRepository;
import SpringProject._Spring.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final ClientService clientService;
    private final PetService petService;
    private final ServiceAtClinicService serviceService;
    private final VetService vetService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, ClientService clientService, PetService petService, ServiceAtClinicService serviceService, VetService vetService) {
        this.appointmentService = appointmentService;
        this.clientService = clientService;
        this.petService = petService;
        this.serviceService = serviceService;
        this.vetService = vetService;
    }

    @PostMapping("/services")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addAppointment(@Valid @RequestBody AppointmentRequestDTO appointmentDTO,
                                            Authentication authentication) {
        if (appointmentDTO.appointmentIds().stream()
                .anyMatch(appointmentId -> appointmentService.existsByPetIdAndAppointmentId(
                                appointmentDTO.petId(), appointmentId
                        )
                )
        ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Your pet is already registered to this service!");
        }

        Appointment savedAppointment = appointmentService.saveAppointment(
                AppointmentMapping.toAppointment(appointmentDTO,
                        serviceService.findAllServicesById(appointmentDTO.appointmentIds()
                        )
                )
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new AppointmentResponseDTO(
                        petService.getPetByid(savedAppointment.getId()).get(),
                        vetService.getVetById(savedAppointment.getVetId()).get(),
                        savedAppointment.getServices(),
                        savedAppointment.getAppointmentDate(),
                        savedAppointment.getNotes())
        );
    }


}
