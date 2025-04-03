package SpringProject._Spring.dto.appointment.vet;

import SpringProject._Spring.model.authentication.Vet;

public class VetAppointmentMapping {
    public static VetAppointmentResponseDTO toVetDTO(Vet vet){
        return new VetAppointmentResponseDTO(vet.getId(), vet.getFirstName(), vet.getLastName(), vet.getSpecialty());
    }
}
