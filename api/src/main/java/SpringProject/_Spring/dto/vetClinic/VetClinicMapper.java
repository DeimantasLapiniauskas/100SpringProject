package SpringProject._Spring.dto.vetClinic;

import SpringProject._Spring.model.VetClinic;

public class VetClinicMapper {

    public static VetClinicResponseDTO toVetClinicResponseDTO(VetClinic vetClinic) {
        return new VetClinicResponseDTO(vetClinic.getName(), vetClinic.getAddress(), vetClinic.getEmail(),
                vetClinic.getPhone());
    }
}
