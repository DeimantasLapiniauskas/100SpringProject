package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.model.appointment.Status;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Optional;

public record AppointmentRescheduleDTO(
        @NotNull(message = "You have to tell us to when you're rescheduling!")
        @NotBlank(message = "You have to tell us to when you're rescheduling!")
        @Future(message = "Your rescheduled date has to be in the future!")
        LocalDateTime newDate
) {
}
