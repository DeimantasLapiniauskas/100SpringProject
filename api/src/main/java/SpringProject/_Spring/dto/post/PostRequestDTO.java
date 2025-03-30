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
                             @Size(min = 3, max = 100, message = "Title must be at least 3 characters long but not longer than 100 characters" )
                             String title,

                             @NotNull
                             @NotBlank(message = "Content cannot be empty")
                             @Size(min = 10, max = 10000, message = "Content must be at least 10 characters long but not longer than 100 characters")
                             String content,

                             @NotNull(message = "Post type is required")
                             PostType postType,

                             @Pattern(
                                     regexp = "^(https?://)?([\\w-]+\\.)+[a-zA-Z]{2,}(:\\d+)?(/[\\w\\-.~:/?#[\\\\]@!$&'()*+,;=]*)\\.(jpg|jpeg|png|webp|gif)$",
                                     message = "Image URL must be valid and end with .jpg, .png, .webp or .gif"
                             )
                             @NotBlank(message = "Image URL is required")
                             @Size(max = 255, message = "URL must not exceed 255 characters")
                             String imageUrl

) {
}
