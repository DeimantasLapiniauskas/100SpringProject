package SpringProject._Spring.dto.contact_messages.subject_types;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SubjectTypesRequestDTO(

        @NotNull
        @NotBlank(message = "Name cannot be empty")
        @Size(max = 100, message = "Name cannot be longer than 100 characters")
        String name
) {
}
