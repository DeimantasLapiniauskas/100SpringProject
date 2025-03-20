package SpringProject._Spring.dto.vet;

public record VetResponseDTO(
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String specialty
) {
}
