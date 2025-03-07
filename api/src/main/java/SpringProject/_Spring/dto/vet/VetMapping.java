package SpringProject._Spring.dto.vet;

import SpringProject._Spring.model.Vet;

import java.sql.Timestamp;
import java.time.LocalDate;

public class VetMapping {

    public static Vet toVet(VetRequestDTO vetRequestDTO) {
        return new Vet(
                vetRequestDTO.firstName(),
                vetRequestDTO.lastName(),
                vetRequestDTO.phoneNumber(),
                vetRequestDTO.specialty(),
                vetRequestDTO.licenseNumber(),
                LocalDate.now(),
                vetRequestDTO.email(),
                vetRequestDTO.password()
        );
    }

    public static VetResponseDTO toVetResponseDTO(Vet vet) {
        return new VetResponseDTO(
                vet.getEmail(),
                vet.getFirstName(),
                vet.getLastName(),
                vet.getSpecialty()
        );
    }


}
