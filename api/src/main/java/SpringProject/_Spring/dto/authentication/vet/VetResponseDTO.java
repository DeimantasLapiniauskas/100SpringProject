package SpringProject._Spring.dto.authentication.vet;

public record VetResponseDTO(
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String specialty
) {
}
