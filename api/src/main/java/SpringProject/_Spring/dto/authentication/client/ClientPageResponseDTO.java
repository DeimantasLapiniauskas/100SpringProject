package SpringProject._Spring.dto.authentication.client;

import java.util.List;

public record ClientPageResponseDTO(
        List<ClientResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize
) {
}
