package SpringProject._Spring.dto;

import java.math.BigDecimal;

public record ServiceAtClinicDTO(
        long id,
        String name,
        String description,
        BigDecimal price
) {
}