package SpringProject._Spring.dto.post;


import SpringProject._Spring.model.post.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public record PostRequestDTO(@NotNull
                             @NotBlank(message = "Title cannot be empty")
                             @Size(min = 3, max = 100, message = "Title must be at least 3 characters long but not longer than 100 characters" )
                             String title,

                             @NotNull
                             @NotBlank(message = "Content cannot be empty")
                             @Size(min = 10, max = 20000, message = "Content must be at least 10 characters long but not longer than 2000 characters")
                             String content,

                             @NotNull(message = "Post type is required")
                             PostType postType,

                             @Pattern(
                                     regexp = ".*\\.(jpg|jpeg|png|webp|gif)$",
                                     message = "Image URL must end with .jpg, .png, .webp or .gif"
                             )
                             @Size(max = 255, message = "URL must not exceed 255 characters")
                             String imageUrl

) {
}
