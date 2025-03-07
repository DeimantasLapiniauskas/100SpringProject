package SpringProject._Spring.dto.client;

import SpringProject._Spring.model.Client;

import java.sql.Timestamp;

public class ClientMapping {

    public static Client toClient(ClientRequestDTO clientRequestDTO) {
        return new Client(
                clientRequestDTO.firstName(),
                clientRequestDTO.lastName(),
                clientRequestDTO.phoneNumber(),
                new Timestamp(System.currentTimeMillis())
        );
    }

    public static ClientResponseDTO toClientResponseDTO(Client client) {
        return new ClientResponseDTO(
                client.getAccount().getEmail(),
                client.getFirstName(),
                client.getLastName()
        );
    }


}
