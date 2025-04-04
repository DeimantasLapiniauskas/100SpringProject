package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.dto.authentication.vet.VetResponseDTO;
import SpringProject._Spring.dto.pet.PetResponseDTO;
import SpringProject._Spring.dto.service.ServiceAtClinicMapper;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.ServiceAtClinic;

import java.sql.Timestamp;
import java.util.List;

public class AppointmentMapping {
    public static Appointment toAppointment(AppointmentRequestDTO appointmentDTO, List<ServiceAtClinic> services) {
        return new Appointment(
                appointmentDTO.petId(),
                appointmentDTO.vetId(),
                services,
                appointmentDTO.appointmentDate(),
                appointmentDTO.notes(),
                new Timestamp(System.currentTimeMillis())
        );
    }

    public static AppointmentResponseDTO toAppointmentDTO(Appointment appointment, PetResponseDTO petDTO, VetResponseDTO vetDTO){
        return new AppointmentResponseDTO(
                appointment.getId(),
                petDTO,
                vetDTO,
                appointment.getServices().stream().map(ServiceAtClinicMapper::toServiceAtClinicDTO).toList(),
                appointment.getAppointmentDate(),
                appointment.getNotes(),
                appointment.getTotalServicesSum(),
                appointment.getStatus()
        );
    }


}
