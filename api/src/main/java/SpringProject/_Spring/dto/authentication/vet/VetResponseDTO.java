package SpringProject._Spring.dto.authentication.vet;

import java.time.LocalDate;

public record VetResponseDTO(
        long id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String specialty,
        String licenseNumber,
        LocalDate hireDate
) {
}
