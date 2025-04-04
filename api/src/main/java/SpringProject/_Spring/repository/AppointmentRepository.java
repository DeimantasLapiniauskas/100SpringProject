package SpringProject._Spring.repository;

import SpringProject._Spring.model.appointment.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByPetIdAndServices_Id(long petId, long appointmentId);


    List<Appointment> findAllByPet_ownerId(Long id);

    List<Appointment> findAllByPetId(Long id);
}
