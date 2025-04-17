package SpringProject._Spring.service;

import SpringProject._Spring.dto.contact_messages.ContactMessRequestDTO;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.ContactMessages.ContactMessages;
import SpringProject._Spring.repository.ContactMessagesRepository;
import SpringProject._Spring.repository.SubjectTypesRepository;
import SpringProject._Spring.repository.VetClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactMessagesService {

    private final ContactMessagesRepository contactMessagesRepository;
    private final SubjectTypesRepository subjectTypesRepository;
    private final VetClinicRepository vetClinicRepository;

    @Autowired
    public ContactMessagesService(ContactMessagesRepository contactMessagesRepository,SubjectTypesRepository subjectTypesRepository, VetClinicRepository vcr) {
        this.contactMessagesRepository = contactMessagesRepository;
        this.subjectTypesRepository = subjectTypesRepository;
        this.vetClinicRepository = vcr;
    }

    public ContactMessages saveContactMessages(ContactMessages contactMessages) {
        if (!subjectTypesRepository.existsById(contactMessages.getSubject_type_id())){
            throw new NotFoundException("Subject Type Not Found:" + contactMessages.getSubject_type_id());
        }
        contactMessages.setVet_clinic(vetClinicRepository.findAll().stream().findFirst().orElseThrow(() -> new NotFoundException("Vet clinic not found")));
        return contactMessagesRepository.save(contactMessages);
    }

    public Optional<ContactMessages> getContactMessagesById(long id) {
        return contactMessagesRepository.findById(id);
    }

    public boolean existsContactMessagesById(long id) {
        return contactMessagesRepository.existsById(id);
    }

    public List<ContactMessages> getAllContactMessages() {
        return contactMessagesRepository.findAll();
    }

    public void deleteContactMessagesById(long id) {
        contactMessagesRepository.deleteById(id);
    }

    public ContactMessages updateContactMessages(ContactMessages contactMessages, ContactMessRequestDTO contactMessRequestDTO) {
        contactMessages.setSubject_type_id(contactMessRequestDTO.subject_type_id());
        contactMessages.setEmail(contactMessRequestDTO.email());
        contactMessages.setName(contactMessRequestDTO.name());
        contactMessages.setMessage(contactMessRequestDTO.message());

        saveContactMessages(contactMessages);

        return contactMessages;
    }
}
