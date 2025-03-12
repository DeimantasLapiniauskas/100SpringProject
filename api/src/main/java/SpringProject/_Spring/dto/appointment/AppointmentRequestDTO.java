package SpringProject._Spring.dto.appointment;


import java.time.LocalDateTime;
import java.util.List;

public record AppointmentRequestDTO(
        long petId,
        long vetId,
        List<Long> serviceIds,
        LocalDateTime appointmentDate,
        String notes
) {
}
