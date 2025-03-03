package SpringProject._Spring.dto;

import SpringProject._Spring.model.Account;

public class AccountResponseMapper {
    public static AccountResponseDTO toAccountResponseDTO(Account account) {
        return new AccountResponseDTO(account.getId(), account.getEmail(), RoleMapper.toRoleDTOList(account));
    }
}
