package SpringProject._Spring.dto.pet;

import java.util.List;

public record PetPageResponseDTO(
        List<PetResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize) {}
