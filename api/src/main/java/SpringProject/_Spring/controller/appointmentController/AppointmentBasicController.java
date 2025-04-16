package SpringProject._Spring.controller.appointmentController;


import SpringProject._Spring.controller.BaseController;
import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.appointment.AppointmentMapping;
import SpringProject._Spring.dto.appointment.AppointmentRequestDTO;
import SpringProject._Spring.dto.appointment.AppointmentRescheduleDTO;
import SpringProject._Spring.dto.appointment.AppointmentResponseDTO;
import SpringProject._Spring.dto.appointment.vet.VetAppointmentMapping;
import SpringProject._Spring.dto.appointment.vet.VetAppointmentResponseDTO;
import SpringProject._Spring.dto.pet.PetMapping;
import SpringProject._Spring.dto.authentication.vet.VetMapping;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.service.*;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import com.google.common.collect.Lists;
import io.swagger.v3.oas.annotations.Operation;
import it.ozimov.springboot.mail.model.Email;
import it.ozimov.springboot.mail.service.EmailService;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AppointmentBasicController extends BaseController {

    private final AppointmentService appointmentService;
    private final PetService petService;
    private final ServiceAtClinicService serviceService;
    private final VetService vetService;
    private final ClientService clientService;
    private final AccountService accountService;
    private final EmailService emailService;

    @Autowired
    public AppointmentBasicController(AppointmentService appointmentService,
                                      PetService petService,
                                      ServiceAtClinicService serviceService,
                                      VetService vetService,
                                      ClientService clientService,
                                      AccountService accountService,
                                      EmailService emailService) {
        this.appointmentService = appointmentService;
        this.petService = petService;
        this.serviceService = serviceService;
        this.vetService = vetService;
        this.clientService = clientService;
        this.accountService = accountService;
        this.emailService = emailService;
    }


    @Operation(summary = "Create new appointment", description = "Creates an appointment for a pet with selected vet")
    @PostMapping("/appointments")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<?> addAppointment(@Valid @RequestBody AppointmentRequestDTO appointmentDTO, Authentication authentication) throws AddressException {
        if (appointmentDTO.serviceIds().stream()
                .anyMatch(appointmentId -> appointmentService.existsByPetIdAndServiceIdAndIsScheduled(
                                appointmentDTO.petId(), appointmentId
                        )
                )
        ) {
            return badRequest(appointmentDTO, "Your pet is already registered to at least one of these services!");
        }


        Appointment savedAppointment = appointmentService.saveAppointment(
                AppointmentMapping.toAppointment(appointmentDTO,
                        appointmentDTO.serviceIds().stream().map(id -> serviceService.findServiceAtClinicById(id).get()).toList()
                )
        );

        emailService.send(
                AppointmentMapping.makeEmail(
                        vetService.getVetById(savedAppointment.getVetId()).get().getAccount().getEmail(),
                        "New appointment scheduled",
                        "A user by the email of " + authentication.getName() + " has scheduled an appointment to your " + String.join(", ", savedAppointment.getServices().stream().map(ServiceAtClinic::getName).toList()) + " service(s), " + savedAppointment.getAppointmentDate() + ". Please log in and confirm!"
                )
        );

        return created(
                AppointmentMapping.toAppointmentDTO(
                        savedAppointment,
                        PetMapping.toPetResponseDTO(petService.getPetById(savedAppointment.getPetId()).get()),
                        VetMapping.toVetResponseDTO(vetService.getVetById(savedAppointment.getVetId()).get())
                ), "Appointment created successfully! Now please wait for confirmation."
        );
    }

    @Operation(summary = "Reschedule an appointment", description = "Reschedules an appointment by its unique ID")
    @PutMapping("/appointments/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<Object>> rescheduleAppointmentClient(@PathVariable long id,
                                                                           @RequestBody @Valid AppointmentRescheduleDTO rescheduleDTO,
                                                                           Authentication authentication) throws AddressException {
        if (!appointmentService.existsAppointmentById(id)) {
            return notFound("Appointment not found!");
        }

        Account currentAccount = accountService.findByEmail(authentication.getName()).get();
        Appointment appointmentFromDB = appointmentService.getAppointmentById(id).get();
        appointmentFromDB.setAppointmentDate(rescheduleDTO.newDate());

        if (currentAccount.getRoles().stream()
                .anyMatch(
                        role -> Objects.equals(role.getName(), "ROLE_CLIENT")
                )
        ) {
            appointmentFromDB.setStatus(Status.ScheduledUnconfirmedByVet);
            emailService.send(
                    AppointmentMapping.makeEmail(
                            vetService.getVetById(appointmentFromDB.getVetId()).get().getAccount().getEmail(),
                            "New appointment scheduled",
                            "A user by the email of " + authentication.getName() + " has rescheduled an appointment to your " + String.join(", ", appointmentFromDB.getServices().stream().map(ServiceAtClinic::getName).toList()) + " service(s) for " + appointmentFromDB.getAppointmentDate() + ", please log in and confirm!"
                    )
            );
        } else {
            appointmentFromDB.setStatus(Status.ScheduledUnconfirmedByClient);
            try { // breaks if pet or vet that was registered has been deleted.
                emailService.send(
                        AppointmentMapping.makeEmail(
                                clientService.findClientById(petService.findById(appointmentFromDB.getPetId()).get().getOwnerId()).get().getAccount().getEmail(),
                                "New appointment scheduled",
                                "The veterinarian you were registered to for " + String.join(", ", appointmentFromDB.getServices().stream().map(ServiceAtClinic::getName).toList()) + " service(s) at " + appointmentFromDB.getAppointmentDate() + " has rescheduled the appointment., please log in and confirm!"
                        )
                );
            } catch (Exception e) {
                System.err.println(e.getMessage());
            }
        }

        appointmentService.saveAppointment(appointmentFromDB);

        return ok("Appointment updated its date successfully! Now please wait for confirmation.");
    }


    @Operation(summary = "Cancel an appointment", description = "Cancels an appointment by its unique ID")
    @PutMapping("/appointments/cancel/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<Object>> cancelAppointment(@PathVariable long id,
                                                                 Authentication authentication) throws AddressException {

        if (!appointmentService.existsAppointmentById(id)) {
            return notFound("Appointment not found!");
        }

        Appointment appointmentFromDB = appointmentService.getAppointmentById(id).get();

        if (appointmentFromDB.getStatus().name().equals(Status.Cancelled.name())) {
            return badRequest(id, "This appointment is already cancelled!");
        }

        Optional<Vet> vetUser = vetService.findVetByAccountEmail(authentication.getName());
        if (vetUser.isPresent()) { // if vet:
            if (vetUser.get().getId() != appointmentFromDB.getVetId()) {
                return wrongAccountCancelResponse();
            }
            emailService.send(
                    AppointmentMapping.makeEmail(
                            clientService.findClientById(petService.findById(appointmentFromDB.getPetId()).get().getOwnerId()).get().getAccount().getEmail(),
                            "New appointment cancelled",
                            "Your appointment to " + String.join(", ", appointmentFromDB.getServices().stream().map(ServiceAtClinic::getName).toList()) + " service(s) has been cancelled by the vet. We hope this doesn't result in any inconveniences!"
                    )
            );
        } else { // if client:
            /*todo: This breaks if you try to cancel after deleting your pet. Find a way to check if
               the client asking to cancel the appointment is the one associated with said appointment
               without checking via pet -> ownerId*/
            if (clientService.findClientIdByEmail(authentication.getName()) !=
                    petService.findById(appointmentFromDB.getPetId()).get().getOwnerId()) {
                return wrongAccountCancelResponse();
            }
            emailService.send(
                    AppointmentMapping.makeEmail(
                            vetService.getVetById(appointmentFromDB.getVetId()).get().getAccount().getEmail(),
                            "New appointment cancelled",
                            "A user by the email of " + authentication.getName() + " has cancelled an appointment to your " + String.join(", ", appointmentFromDB.getServices().stream().map(ServiceAtClinic::getName).toList()) + " service(s), enjoy your now-free time!"
                    )
            );
        }
        appointmentFromDB.setStatus(Status.Cancelled);
        appointmentService.saveAppointment(appointmentFromDB);

        return ok("Appointment cancelled successfully!");
    }

    private ResponseEntity<ApiResponse<Object>> wrongAccountCancelResponse() {
        return forbidden("You can't cancel someone else's appointment!");
    }


    @Operation(summary = "Get all appointments for current client", description = "Retrieves all appointments for currently authenticated client")
    @GetMapping("/appointments/client")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> getOwnClientAppointments(Authentication authentication) {
        return ok(
                appointmentService.getAllAppointmentsByClientId(clientService.findClientIdByEmail(authentication.getName()))
                        .stream().map(appointment -> AppointmentMapping.toAppointmentDTO(
                                appointment,
                                PetMapping.toPetResponseDTO(petService.getPetById(appointment.getPetId()).get()),
                                VetMapping.toVetResponseDTO(vetService.getVetById(appointment.getVetId()).get())
                        ))
                        .toList());
    }

    @Operation(summary = "Get all appointments for current client", description = "Retrieves all appointments for currently authenticated client")
    @GetMapping("/appointments/{id}")
//    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> getAppointment(@PathVariable long id) {
        return ok(
                appointmentService.getAppointmentById(id)
                        .stream().map(appointment -> AppointmentMapping.toAppointmentDTO(
                                appointment,
                                PetMapping.toPetResponseDTO(petService.getPetById(appointment.getPetId()).get()),
                                VetMapping.toVetResponseDTO(vetService.getVetById(appointment.getVetId()).get())
                        ))
                        .toList()
        );
    }

    @Operation(summary = "Get all appointments for current vet", description = "Retrieves all appointments for currently authenticated vet")
    @GetMapping("/appointments/vet")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> getOwnVetAppointments(Authentication authentication) {
        return ok(appointmentService.getAllAppointmentsByVetId(vetService.findVetByAccountEmail(authentication.getName()).get().getId())
                .stream().map(appointment -> AppointmentMapping.toAppointmentDTO(
                        appointment,
                        PetMapping.toPetResponseDTO(petService.getPetById(appointment.getPetId()).get()),
                        VetMapping.toVetResponseDTO(vetService.getVetById(appointment.getVetId()).get())
                ))
                .toList());
    }

//    @Operation(summary = "Get appointment by ID (Admin)", description = "Retrieves all appointment by it's unique ID")
//    @GetMapping("/appointments/{id}")
//    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
//    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> getAdminAppointments(@PathVariable long id) {
//        return ok(appointmentService.getAllAppointmentsByClientId(id)
//                .stream().map(appointment -> AppointmentMapping.toAppointmentDTO(
//                        appointment,
//                        PetMapping.toPetResponseDTO(petService.getPetById(appointment.getPetId()).get()),
//                        VetMapping.toVetResponseDTO(vetService.getVetById(appointment.getVetId()).get())
//                ))
//                .toList());
//    }

    //Why is this in this controller? -DL
    @Operation(summary = "Get vets list", description = "Retrieves a vet list (names, specialty)")
    @GetMapping("/vets")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT') or hasAuthority('SCOPE_ROLE_ADMIN') or hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<List<VetAppointmentResponseDTO>>> getVeterinarians() {
        List<VetAppointmentResponseDTO> vetsDTO = vetService.getAllVets().stream().map(VetAppointmentMapping::toVetDTO).toList();
        return ok(vetsDTO);
    }
}
