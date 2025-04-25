package SpringProject._Spring.dto.authentication.client;

import SpringProject._Spring.dto.authentication.account.AccountResponseDTO;

public record ClientResponseDTO(
        long id,
        AccountResponseDTO accountResponseDTO,
        String firstName,
        String lastName,
        String phoneNumber
) {

}
