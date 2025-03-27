package SpringProject._Spring.dto.service;

import java.util.List;

public record ServiceAtClinicPageResponseDTO(
        List<ServiceAtClinicResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize
) {
}
