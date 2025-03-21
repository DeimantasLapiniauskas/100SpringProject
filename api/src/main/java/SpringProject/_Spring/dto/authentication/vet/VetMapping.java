package SpringProject._Spring.dto.authentication.vet;

import SpringProject._Spring.model.authentication.Vet;

import java.time.LocalDate;

public class VetMapping {

    public static Vet toVet(VetRequestDTO vetRequestDTO) {
        return new Vet(
                vetRequestDTO.firstName(),
                vetRequestDTO.lastName(),
                vetRequestDTO.phoneNumber(),
                vetRequestDTO.specialty(),
                vetRequestDTO.licenseNumber(),
                LocalDate.now()
        );
    }

    public static VetResponseDTO toVetResponseDTO(Vet vet) {
        return new VetResponseDTO(
                vet.getAccount().getEmail(),
                vet.getFirstName(),
                vet.getLastName(),
                vet.getSpecialty()
        );
    }


}
