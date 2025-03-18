package SpringProject._Spring.dto.post;

import SpringProject._Spring.model.PostType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

public record PostRequestDTO(@NotNull
                             @NotBlank(message = "You must provide a title!")
                             @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters" )
                             String title,

                             @NotNull
                             @NotBlank(message = "You must write something here")
                             String text,

                             @NotNull
                             PostType postType,

                             String imgUrl
) {
}
