package SpringProject._Spring.dto.appointment;


import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.List;

public record AppointmentRequestDTO(

        @NotNull(message = "You have to actually register a pet!")
        Long petId,

        @NotNull(message = "You have to actually register to a vet!")
        Long vetId,

        @NotNull(message = "You have to actually register to a service!")
        List<Long> serviceIds,

        @FutureOrPresent(message = "You can't make an appointment in the past!")
        @NotNull(message = "You have to actually register at a predetermined time!")
        LocalDateTime appointmentDate,

        @Length(max = 255, message = "Your note is too long! Please keep it to 255 or less characters.")
        String notes
) {
}
