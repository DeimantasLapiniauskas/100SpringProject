package SpringProject._Spring.dto.role;

import SpringProject._Spring.dto.service.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Role;
import SpringProject._Spring.model.ServiceAtClinic;

import java.util.List;

public class RoleMapper {
    public static List<RoleDTO> toRoleDTOList(Account account) {
        return account.getRoles().stream()
                .map(RoleMapper::toRoleDTO)
                .toList();
    }

    private static RoleDTO toRoleDTO(Role role) {
        return new RoleDTO(role.getId());
    }

    public static List<Role> toRoleListFromDTO(List<RoleDTO> roleDTOList) {
        return roleDTOList.stream().map(RoleMapper::toRole).toList();
    }

    private static Role toRole(RoleDTO roleDTO) {
        Role role = new Role();

        role.setId(roleDTO.id());

        return role;
    }

    public ServiceAtClinic updateServiceAtClinic(ServiceAtClinicRequestDTO serviceAtClinicRequestDTO, ServiceAtClinic serviceAtClinic) {
        serviceAtClinic.setName(serviceAtClinicRequestDTO.name());
        serviceAtClinic.setDescription(serviceAtClinicRequestDTO.description());
        serviceAtClinic.setPrice(serviceAtClinicRequestDTO.price());
        return serviceAtClinic;
    }
}
