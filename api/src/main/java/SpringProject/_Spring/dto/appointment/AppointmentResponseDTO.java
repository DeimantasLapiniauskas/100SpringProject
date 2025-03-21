package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.dto.pet.PetResponseDTO;
import SpringProject._Spring.dto.authentication.vet.VetResponseDTO;
import SpringProject._Spring.model.ServiceAtClinic;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record AppointmentResponseDTO(
        PetResponseDTO petDTO,
        VetResponseDTO vetDTO,
        List<ServiceAtClinic> services,
        LocalDateTime appointmentDate,
        String notes,
        BigDecimal price
) {

}
