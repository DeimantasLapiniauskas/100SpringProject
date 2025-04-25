package SpringProject._Spring.dto.contact_messages;

import SpringProject._Spring.dto.contact_messages.subject_types.SubjectTypesResponseDTO;
import SpringProject._Spring.model.ContactMessages.ContactMessages;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

public class ContactMessMapper {

//    public static ContactMessResponseDTO toContactMessResponseDTO(ContactMessages contactMessages, SubjectTypesResponseDTO subjectTypesResponseDTO) {
//        return new ContactMessResponseDTO(contactMessages.getId(), subjectTypesResponseDTO ,contactMessages.getEmail(),
//                contactMessages.getName(), contactMessages.getMessage(), contactMessages.getCreated_at());
//    }

    public static ContactMessResponseDTO toContactMessResponseDTO(ContactMessages contactMessages) {
        return new ContactMessResponseDTO(contactMessages.getId(),contactMessages.getEmail(),
                contactMessages.getName(), contactMessages.getMessage(), contactMessages.getCreated_at());
    }

    public static ContactMessages toContactMessages(ContactMessRequestDTO contactMessRequestDTO) {
        return new ContactMessages( contactMessRequestDTO.subject_type_id(),
                                    contactMessRequestDTO.email(),
                                    contactMessRequestDTO.name(),
                                    contactMessRequestDTO.message(),
                                    new Timestamp(System.currentTimeMillis()));
    }


    
    public static List<ContactMessResponseDTO> toContactMessResponseDTOList(List<ContactMessages> contactMessages) {
        return contactMessages.stream()
                .map(ContactMessMapper::toContactMessResponseDTO)
                .collect(Collectors.toList());
    }
}
