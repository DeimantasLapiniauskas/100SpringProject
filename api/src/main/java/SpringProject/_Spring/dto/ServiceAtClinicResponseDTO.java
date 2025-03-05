package SpringProject._Spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.math.RoundingMode;

public record ServiceAtClinicResponseDTO(
        long id,
        String name,
        String description,
        BigDecimal price
) {

}
