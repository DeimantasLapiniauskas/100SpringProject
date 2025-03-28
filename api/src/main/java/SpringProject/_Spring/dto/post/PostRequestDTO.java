package SpringProject._Spring.dto.post;

import SpringProject._Spring.model.post.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jdk.jfr.Label;
import org.hibernate.validator.constraints.Length;

public record PostRequestDTO(@NotNull
                             @NotBlank(message = "Title cannot be empty")
                             @Size(max = 100, message = "Title must be not longer than 100 characters" )
                             String title,

                             @NotNull
                             @NotBlank(message = "Content cannot be empty")
                             @Size(max = 10000)
                             String content,

                             @NotNull(message = "Post type is required")
                             PostType postType,

                             @Pattern(
                                     regexp = "^(https?://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(:\\d+)?(/[^\s]*)?$",
                                     message = "Invalid URL format"
                             )
                             @Size(max = 255, message = "URL must not exceed 255 characters")
                             String imgUrl
) {
}
