package SpringProject._Spring.controller;


import SpringProject._Spring.dto.appointment.AppointmentMapping;
import SpringProject._Spring.dto.appointment.AppointmentRequestDTO;
import SpringProject._Spring.dto.appointment.AppointmentResponseDTO;
import SpringProject._Spring.dto.pet.PetMapping;
import SpringProject._Spring.dto.vet.VetMapping;
import SpringProject._Spring.model.Appointment;
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

@RestController
@RequestMapping("/api")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final PetService petService;
    private final ServiceAtClinicService serviceService;
    private final VetService vetService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService, PetService petService, ServiceAtClinicService serviceService, VetService vetService) {
        this.appointmentService = appointmentService;
        this.petService = petService;
        this.serviceService = serviceService;
        this.vetService = vetService;
    }

    @PostMapping("/appointments")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addAppointment(@Valid @RequestBody AppointmentRequestDTO appointmentDTO,
                                            Authentication authentication) {
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
                        PetMapping.toPetResponseDTO(petService.getPetByid(savedAppointment.getPetId()).get()),
                        VetMapping.toVetResponseDTO(vetService.getVetById(savedAppointment.getVetId()).get()),
                        savedAppointment.getServices(),
                        savedAppointment.getAppointmentDate(),
                        savedAppointment.getNotes())
        );
    }


}
