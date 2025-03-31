package SpringProject._Spring.dto.vet;

import SpringProject._Spring.dto.authentication.vet.VetPageResponseDTO;
import SpringProject._Spring.dto.authentication.vet.VetRequestDTO;
import SpringProject._Spring.dto.authentication.vet.VetResponseDTO;
import SpringProject._Spring.model.authentication.Vet;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;

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
                vet.getId(),
                vet.getAccount().getEmail(),
                vet.getFirstName(),
                vet.getLastName(),
                vet.getPhoneNumber(),
                vet.getSpecialty(),
                vet.getLicenseNumber()
        );
    }


    public static VetPageResponseDTO toVetPageResponseDTO(Page<Vet> vetsPage) {
        List<VetResponseDTO> vetResponseListDTO = vetsPage.getContent()
                .stream()
                .map(VetMapping::toVetResponseDTO)
                .toList();

        return new VetPageResponseDTO(
                vetResponseListDTO,
                vetsPage.getTotalPages(),
                (int) vetsPage.getTotalElements(),
                vetsPage.getNumber(),
                vetsPage.getSize()
        );
    }
}
