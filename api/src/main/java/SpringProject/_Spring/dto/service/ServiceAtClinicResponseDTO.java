package SpringProject._Spring.dto.service;

import java.math.BigDecimal;

public record ServiceAtClinicResponseDTO(
        long id,
        String name,
        String description,
        BigDecimal price,
        String imageUrl
) {

}
