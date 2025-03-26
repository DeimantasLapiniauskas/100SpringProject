package SpringProject._Spring.dto.post;

import java.util.List;

public record PostPageResponseDTO(
        List<PostResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize,
        String sortBy
) {}
