package SpringProject._Spring.dto.authentication.client;

public record ClientResponseDTO(
        long id,
        String email,
        String firstName,
        String lastName,
        String phoneNumber
) {

}
