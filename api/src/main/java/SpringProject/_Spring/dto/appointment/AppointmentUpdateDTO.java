package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.model.appointment.Status;

import java.time.LocalDateTime;
import java.util.Optional;

public record AppointmentUpdateDTO(
        Optional<Status> status,
        Optional<LocalDateTime> newDate
) {
}
