package SpringProject._Spring.dto.contact_messages;

import SpringProject._Spring.dto.contact_messages.subject_types.SubjectTypeResponseDTO;
import SpringProject._Spring.model.contactMessage.ContactMessage;
import SpringProject._Spring.model.contactMessage.SubjectTypes;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class ContactMessageMapper {

    public static ContactMessageResponseDTO toContactMessageResponseDTO(ContactMessage contactMessage) {
        return new ContactMessageResponseDTO(contactMessage.getId(), contactMessage.getEmail(),
                contactMessage.getName(), contactMessage.getMessage(), contactMessage.getCreated_at());
    }

    public static ContactMessage toContactMessages(ContactMessageRequestDTO contactMessageRequestDTO) {
        return new ContactMessage(contactMessageRequestDTO.subject_type_id(),
                contactMessageRequestDTO.email(),
                contactMessageRequestDTO.name(),
                contactMessageRequestDTO.message(),
                new Timestamp(System.currentTimeMillis()));
    }

    public static List<ContactMessageResponseDTO> toContactMessageResponseDTOList(List<ContactMessage> contactMessages) {
        return contactMessages.stream()
                .map(ContactMessageMapper::toContactMessageResponseDTO)
                .collect(Collectors.toList());
    }

    public static SubjectTypeResponseDTO toSubjectTypeDTO(SubjectTypes subjectTypes) {
        return new SubjectTypeResponseDTO(subjectTypes.getId(), subjectTypes.getName());
    }
}
