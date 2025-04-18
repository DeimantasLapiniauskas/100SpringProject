package SpringProject._Spring.dto.contact_messages;

import SpringProject._Spring.validation.customAnnotations.authentication.email.EmailLength;
import SpringProject._Spring.validation.customAnnotations.authentication.email.EmailRegex;
import SpringProject._Spring.validation.customAnnotations.authentication.firstName.FNameLength;
import SpringProject._Spring.validation.customAnnotations.authentication.firstName.FNameRegex;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ContactMessRequestDTO(
                                    @NotNull(message = "You have to have a type")
                                    long subject_type_id,

                                    @NotNull
                                    @EmailLength
                                    @EmailRegex
                                    String email,

                                    @NotNull(message = "Name cannot be empty")
                                    @FNameLength
                                    @FNameRegex
                                    String name,

                                    @NotNull
                                    @NotBlank(message = "Message cannot be empty")
                                    String message

                                    ) {
}
