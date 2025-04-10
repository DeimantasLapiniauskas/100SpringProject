package SpringProject._Spring.dto.appointment;

import SpringProject._Spring.dto.authentication.vet.VetResponseDTO;
import SpringProject._Spring.dto.pet.PetResponseDTO;
import SpringProject._Spring.dto.service.ServiceAtClinicMapper;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.ServiceAtClinic;
import com.google.common.collect.Lists;
import it.ozimov.springboot.mail.model.Email;
import it.ozimov.springboot.mail.model.defaultimpl.DefaultEmail;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;

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

    public static Email makeEmail(String to, String subject, String body) throws AddressException {
        return DefaultEmail.builder()
                .from(new InternetAddress("spring100project@gmail.com"))
                .to(Lists.newArrayList(new InternetAddress(to)))
                .subject(subject)
                .body(body)
                .build();
    }


}
