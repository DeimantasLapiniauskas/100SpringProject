package SpringProject._Spring.dto.post;

import SpringProject._Spring.model.post.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PostRequestDTO(@NotNull
                             @NotBlank(message = "Title cannot be empty")
                             @Size(max = 100, message = "Title must be not longer than 100 characters" )
                             String title,

                             @NotNull
                             @NotBlank(message = "Content cannot be empty")
                             String content,

                             @NotNull(message = "Post type is required")
                             PostType postType,

                             String imgUrl
) {
}
