package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.model.Appointment;
import SpringProject._Spring.model.ServiceAtClinic;

import java.net.URI;
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


}
