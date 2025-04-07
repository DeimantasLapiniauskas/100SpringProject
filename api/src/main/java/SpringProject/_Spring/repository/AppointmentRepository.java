package SpringProject._Spring.repository;

import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.appointment.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByPet_ownerId(Long id);

    List<Appointment> findAllByPetId(Long id);

    boolean existsByPetIdAndStatusAndServices_Id(long petId, Status status, long appointmentId);

    List<Appointment> findAllByStatusAndVet_Account_email(Status status, String vetEmail);

    List<Appointment> findAllByVetId(long id);
}
