package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.dto.pet.PetResponseDTO;
import SpringProject._Spring.dto.vet.VetResponseDTO;
import SpringProject._Spring.model.Pet;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.model.Vet;

import java.time.LocalDateTime;
import java.util.List;

public record AppointmentResponseDTO(
        PetResponseDTO petDTO,
        VetResponseDTO vetDTO,
        List<ServiceAtClinic> services,
        LocalDateTime appointmentDate,
        String notes
) {

}
