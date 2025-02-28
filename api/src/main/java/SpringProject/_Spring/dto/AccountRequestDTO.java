package SpringProject._Spring.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AccountRequestDTO(@Email
                                @NotNull
                                String email,
                                @NotNull
                                @NotBlank
                                String password,
                                @NotEmpty
                                List<RoleDTO> roles) {


}
