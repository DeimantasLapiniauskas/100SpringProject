package SpringProject._Spring.dto.authentication.vet;

public record VetUpdateResponseDTO(String firstName,
                                   String lastName,
                                   String phoneNumber,
                                   String specialty,
                                   String licenseNumber) {
}
