package SpringProject._Spring.dto.authentication.client;

import SpringProject._Spring.model.authentication.Client;

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


    public static void updateClientFromDTO(Client client, ClientUpdateDTO clientUpdateDTO) {
        client.setFirstName(clientUpdateDTO.firstName());
        client.setLastName(clientUpdateDTO.lastName());
        client.setPhoneNumber(clientUpdateDTO.phoneNumber());
    }

    public static ClientUpdateResponseDTO toClientUpdateResponseDTO(Client client) {
        return new ClientUpdateResponseDTO(client.getFirstName(), client.getLastName(), client.getPhoneNumber());
    }
}
