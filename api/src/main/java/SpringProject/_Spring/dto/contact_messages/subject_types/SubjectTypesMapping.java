package SpringProject._Spring.dto.contact_messages.subject_types;

import SpringProject._Spring.model.ContactMessages.SubjectTypes;

public class SubjectTypesMapping {

    public static SubjectTypes toSubjectType(SubjectTypesRequestDTO requestDTO)
    {
        return new SubjectTypes(requestDTO.name());
    }

    public static SubjectTypesResponseDTO toSubjectTypeDTO(SubjectTypes subjectTypes)
    {
        return new SubjectTypesResponseDTO(subjectTypes.getId(), subjectTypes.getName());
    }
}
