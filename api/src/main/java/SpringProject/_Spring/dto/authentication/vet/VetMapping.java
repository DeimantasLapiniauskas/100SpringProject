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


    public static void updateVetFromDTO(Vet vet, VetUpdateDTO vetUpdateDTO) {
        vet.setFirstName(vetUpdateDTO.firstName());
        vet.setLastName(vetUpdateDTO.lastName());
        vet.setPhoneNumber(vetUpdateDTO.phoneNumber());
        vet.setSpecialty(vetUpdateDTO.specialty());
        vet.setLicenseNumber(vetUpdateDTO.licenseNumber());
    }

    public static VetUpdateResponseDTO toVetUpdateResponseDTO(Vet vet) {
        return new VetUpdateResponseDTO(vet.getFirstName(), vet.getLastName(), vet.getPhoneNumber(), vet.getSpecialty(), vet.getLicenseNumber());
    }
}
