package SpringProject._Spring.dto.contactMessages;

import java.sql.Timestamp;

public record ContactMessageResponseDTO(long id,
                                        //SubjectTypeResponseDTO subjectTypeDTO,
                                        String email,
                                        String name,
                                        String message,
                                        Timestamp created_at) {
}
