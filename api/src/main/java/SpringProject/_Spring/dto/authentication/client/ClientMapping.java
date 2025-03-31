package SpringProject._Spring.dto.authentication.client;

import SpringProject._Spring.model.authentication.Client;
import org.springframework.data.domain.Page;

import java.sql.Timestamp;
import java.util.List;

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
                client.getId(),
                client.getAccount().getEmail(),
                client.getFirstName(),
                client.getLastName(),
                client.getPhoneNumber()
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

    public static ClientPageResponseDTO toClientPageResponseDTO(Page<Client> clientsPage) {
        List<ClientResponseDTO> clientResponseListDTO = clientsPage.getContent()
                .stream()
                .map(ClientMapping::toClientResponseDTO)
                .toList();

        return new ClientPageResponseDTO(
                clientResponseListDTO,
                clientsPage.getTotalPages(),
                (int) clientsPage.getTotalElements(),
                clientsPage.getNumber(),
                clientsPage.getSize()
        );
    }
}
