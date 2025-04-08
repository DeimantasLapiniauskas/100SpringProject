package SpringProject._Spring.dto.product;

import java.util.List;

public record ProductPageResponseDTO(
        List<ProductResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize
) {


}
