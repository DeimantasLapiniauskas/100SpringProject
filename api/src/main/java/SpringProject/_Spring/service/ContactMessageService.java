package SpringProject._Spring.service;

import SpringProject._Spring.dto.contactMessages.ContactMessageRequestDTO;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.contactMessage.ContactMessage;
import SpringProject._Spring.repository.contactMessage.ContactMessageRepository;
import SpringProject._Spring.repository.contactMessage.SubjectTypeRepository;
import SpringProject._Spring.repository.VetClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final SubjectTypeRepository subjectTypeRepository;
    private final VetClinicRepository vetClinicRepository;

    @Autowired
    public ContactMessageService(ContactMessageRepository contactMessageRepository, SubjectTypeRepository subjectTypeRepository, VetClinicRepository vetClinicRepository) {
        this.contactMessageRepository = contactMessageRepository;
        this.subjectTypeRepository = subjectTypeRepository;
        this.vetClinicRepository = vetClinicRepository;
    }

    public ContactMessage saveContactMessages(ContactMessage contactMessage) {
        if (!subjectTypeRepository.existsById(contactMessage.getSubject_type_id())) {
            throw new NotFoundException("Subject Type Not Found:" + contactMessage.getSubject_type_id());
        }
        contactMessage.setVet_clinic(vetClinicRepository.findAll().stream().findFirst().orElseThrow(() -> new NotFoundException("Vet clinic not found")));
        return contactMessageRepository.save(contactMessage);
    }

    public Optional<ContactMessage> getContactMessagesById(long id) {
        return contactMessageRepository.findById(id);
    }

    public boolean existsContactMessagesById(long id) {
        return contactMessageRepository.existsById(id);
    }

    public List<ContactMessage> getAllContactMessages() {

        List<ContactMessage> results = contactMessageRepository.findAll();

        if (results.isEmpty()) {
            return null;
        }

        return results;
    }

    public void deleteContactMessagesById(long id) {
        contactMessageRepository.deleteById(id);
    }

    public ContactMessage updateContactMessages(ContactMessage contactMessage, ContactMessageRequestDTO contactMessageRequestDTO) {
        contactMessage.setSubject_type_id(contactMessageRequestDTO.subject_type_id());
        contactMessage.setEmail(contactMessageRequestDTO.email());
        contactMessage.setName(contactMessageRequestDTO.name());
        contactMessage.setMessage(contactMessageRequestDTO.message());

        saveContactMessages(contactMessage);

        return contactMessage;
    }
}
