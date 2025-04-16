package SpringProject._Spring.dto.contact_messages;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ContactMessRequestDTO(
                                    @NotNull(message = "You have to have a type")
                                    long subject_type_id,

                                    @NotNull
                                    @NotBlank(message = "Email cannot be empty")
                                    @Size(max = 255, message = "email cannot be longer than 255 characters")
                                    String email,

                                    @NotNull
                                    @NotBlank(message = "Name cannot be empty")
                                    @Size(max = 100, message = "Name cannot be longer than 100 characters")
                                    String name,

                                    @NotNull
                                    @NotBlank(message = "Message cannot be empty")
                                    String message

                                    ) {
}
