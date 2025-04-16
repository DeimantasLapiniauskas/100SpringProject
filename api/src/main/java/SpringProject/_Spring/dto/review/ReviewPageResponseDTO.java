package SpringProject._Spring.dto.review;
import java.util.List;

public record ReviewPageResponseDTO(
        List<ReviewResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize
) {
}
