package SpringProject._Spring.repository.contactMessage;

import SpringProject._Spring.model.contactMessage.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

}
