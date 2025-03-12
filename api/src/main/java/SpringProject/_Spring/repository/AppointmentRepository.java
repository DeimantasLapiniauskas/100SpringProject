package SpringProject._Spring.repository;

import SpringProject._Spring.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByPetIdAndAppointmentId(long petId, long appointmentId);
}
