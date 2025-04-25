package SpringProject._Spring.dto.contact_messages;

import SpringProject._Spring.dto.contact_messages.subject_types.SubjectTypesResponseDTO;

import java.sql.Timestamp;

public record ContactMessResponseDTO(long id,
                                     //SubjectTypesResponseDTO subjectTypeDTO,
                                     String email,
                                     String name,
                                     String message,
                                     Timestamp created_at)   {
}
