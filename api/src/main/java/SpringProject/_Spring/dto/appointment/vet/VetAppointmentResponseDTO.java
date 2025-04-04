package SpringProject._Spring.dto.appointment.vet;

public record VetAppointmentResponseDTO(
        long id,
        String firstName,
        String lastName,
        String specialty
) {
}
