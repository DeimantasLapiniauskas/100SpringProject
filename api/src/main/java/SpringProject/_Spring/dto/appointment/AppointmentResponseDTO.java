package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.dto.pet.PetResponseDTO;
import SpringProject._Spring.dto.service.ServiceAtClinicResponseDTO;
import SpringProject._Spring.dto.authentication.vet.VetResponseDTO;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record AppointmentResponseDTO(
        long id,
        PetResponseDTO petDTO,
        VetResponseDTO vetDTO,
        List<ServiceAtClinicResponseDTO> services,
        LocalDateTime appointmentDate,
        String notes,
        BigDecimal price
) {

}
