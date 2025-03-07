package SpringProject._Spring.dto.role;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RoleDTO(@NotNull
                      @NotEmpty
                      long id) {


}
