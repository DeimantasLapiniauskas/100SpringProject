package SpringProject._Spring.service;

import SpringProject._Spring.model.Appointment;
import SpringProject._Spring.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public boolean existsByPetIdAndServiceId(long petId, long appointmentId) {
        return appointmentRepository.existsByPetIdAndServices_Id(petId, appointmentId);
    }


    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
}
