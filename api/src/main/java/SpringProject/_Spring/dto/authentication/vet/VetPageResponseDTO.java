package SpringProject._Spring.dto.authentication.vet;

import java.util.List;

public record VetPageResponseDTO(
        List<VetResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize
) {
}
