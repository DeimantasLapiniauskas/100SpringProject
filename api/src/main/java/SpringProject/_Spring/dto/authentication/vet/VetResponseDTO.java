package SpringProject._Spring.dto.authentication.vet;

public record VetResponseDTO(
        long id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String specialty,
        String licenseNumber
) {
}
