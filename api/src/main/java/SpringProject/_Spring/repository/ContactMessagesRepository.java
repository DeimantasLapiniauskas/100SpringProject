package SpringProject._Spring.repository;

import SpringProject._Spring.model.ContactMessages.ContactMessages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessagesRepository extends JpaRepository<ContactMessages, Long> {

}
