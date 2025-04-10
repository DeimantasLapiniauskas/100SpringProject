package SpringProject._Spring.service;

import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import SpringProject._Spring.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public boolean existsByPetIdAndServiceIdAndIsScheduled(long petId, long appointmentId) {
        return appointmentRepository.existsByPetIdAndStatusAndServices_Id(petId, Status.ScheduledUnconfirmedByClient,appointmentId) ||
                appointmentRepository.existsByPetIdAndStatusAndServices_Id(petId, Status.ScheduledUnconfirmedByVet,appointmentId) ||
                appointmentRepository.existsByPetIdAndStatusAndServices_Id(petId, Status.Scheduled,appointmentId);
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> getAppointmentById(long id) {
        return appointmentRepository.findById(id);
    }

    public boolean existsAppointmentById(long id) {
        return appointmentRepository.existsById(id);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAllAppointmentsByClientId(long id) {
        return appointmentRepository.findAllByPet_ownerId(id);
    }

    public List<Appointment> getAllUnconfirmedByVetAppointmentsByEmail(String vetEmail) {
        return appointmentRepository.findAllByStatusAndVet_Account_email(Status.ScheduledUnconfirmedByVet,vetEmail);
    }

    public List<Appointment> getAllUnconfirmedByClientAppointmentsByEmail(String clientEmail) {
        return appointmentRepository.findAllByStatusAndVet_Account_email(Status.ScheduledUnconfirmedByClient,clientEmail);
    }

    public List<Appointment> getAllAppointmentsByVetId(long id) {
        return appointmentRepository.findAllByVetId(id);
    }
}
