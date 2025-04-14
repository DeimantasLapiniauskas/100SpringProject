package SpringProject._Spring.controller.appointmentController;

import SpringProject._Spring.controller.BaseController;
import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import SpringProject._Spring.service.AppointmentService;
import SpringProject._Spring.service.PetService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentConfirmationController extends BaseController {

    private final AppointmentService appointmentService;
    private final PetService petService;
    private final VetService vetService;
    private final ClientService clientService;

    @Autowired
    public AppointmentConfirmationController(AppointmentService appointmentService, PetService petService, VetService vetService, ClientService clientService) {
        this.appointmentService = appointmentService;
        this.petService = petService;
        this.vetService = vetService;
        this.clientService = clientService;
    }

    @Operation(summary = "Confirm an appointment or its rescheduling as a vet", description = "Confirms an appointment or its rescheduling pending approval by vet by its unique ID")
    @PutMapping("/vet/confirm/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<String>> ConfirmAppointmentVet(@PathVariable long id,
                                                                     Authentication authentication) {

        if (!appointmentService.existsAppointmentById(id)) {
            return notFound("Appointment not found!");
        }

        Appointment appointmentFromDB = appointmentService.getAppointmentById(id).get();

        if (!appointmentFromDB.getStatus().name().equals(Status.ScheduledUnconfirmedByVet.name()) ||
                appointmentFromDB.getVetId() != vetService.findVetByAccountEmail(authentication.getName()).get().getId()) {
            return forbidden("This appointment isn't waiting for your approval!");
        }

        appointmentFromDB.setStatus(Status.Scheduled);
        appointmentFromDB.setStatus(Status.Scheduled);
        appointmentService.saveAppointment(appointmentFromDB);
        return ok("Appointment confirmed successfully!");
    }

    @Operation(summary = "Get all unconfirmed appointments or reschedulings as a vet", description = "Gets all appointment or appointment reschedulings pending approval by vet by authenticated vet email")
    @GetMapping("/vet/confirm")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_VET')")
    public ResponseEntity<ApiResponse<List<Appointment>>> GetUnconfirmedAppointmentsVet(Authentication authentication) {
        return ok(appointmentService.getAllUnconfirmedByVetAppointmentsByEmail(authentication.getName()));
    }

    @Operation(summary = "Confirm a rescheduling as a client", description = "Confirms a rescheduling pending approval by client by its unique ID")
    @PutMapping("/client/confirm/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<String>> ConfirmAppointmentClient(@PathVariable long id,
                                                                        Authentication authentication) {

        if (!appointmentService.existsAppointmentById(id)) {
            return notFound("Appointment not found!");
        }

        Appointment appointmentFromDB = appointmentService.getAppointmentById(id).get();

        if (!petService.existsById(appointmentFromDB.getPetId())) {
            return notFound("This pet no longer exists in our database!");
        }

        if (!appointmentFromDB.getStatus().equals(
                Status.ScheduledUnconfirmedByClient) ||
                petService.findById(appointmentFromDB.getPetId()).get().getOwnerId() !=
                        clientService.findClientIdByEmail(authentication.getName())
        ) {
            return forbidden("This appointment isn't waiting for your approval!");
        }

        appointmentFromDB.setStatus(Status.Scheduled);
        appointmentService.saveAppointment(appointmentFromDB);
        return ok("Appointment confirmed successfully!");
    }

    @Operation(summary = "Get all unconfirmed reschedulings as a client", description = "Gets all appointment reschedulings pending approval by client by authenticated client email")
    @GetMapping("/client/confirm")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ApiResponse<List<Appointment>>> GetUnconfirmedAppointmentsClient(Authentication authentication) {
        return ok(appointmentService.getAllUnconfirmedByClientAppointmentsByEmail(authentication.getName()));
    }
}
