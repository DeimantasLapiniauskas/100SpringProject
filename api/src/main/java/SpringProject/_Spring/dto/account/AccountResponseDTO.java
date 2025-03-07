package SpringProject._Spring.dto.account;

import SpringProject._Spring.dto.role.RoleDTO;

import java.util.List;

public record AccountResponseDTO(long id,
                                 String email,
                                 List<RoleDTO> roles) {


}
