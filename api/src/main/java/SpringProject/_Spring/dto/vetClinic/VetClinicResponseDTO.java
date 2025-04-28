package SpringProject._Spring.dto.vetClinic;

import SpringProject._Spring.model.Review;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.authentication.Vet;

import java.util.List;

public record VetClinicResponseDTO(String name,
                                   String address,
                                   String email,
                                   String phone
                                   ) {
}
