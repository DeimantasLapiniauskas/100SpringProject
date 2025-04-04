package SpringProject._Spring.dto.appointment;

import jakarta.validation.constraints.Future;

import java.time.LocalDateTime;

public record AppointmentRescheduleDTO(
        @Future(message = "Your rescheduled date has to be in the future!")
        LocalDateTime newDate
) {
}
