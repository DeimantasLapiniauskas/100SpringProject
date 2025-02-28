package SpringProject._Spring.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RoleDTO(@NotNull
                      @NotEmpty
                      long id) {


}
