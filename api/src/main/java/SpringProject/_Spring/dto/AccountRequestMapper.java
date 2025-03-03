package SpringProject._Spring.dto;

import SpringProject._Spring.model.Account;

import java.util.ArrayList;

public class AccountRequestMapper {


    public static Account toAccount(AccountRequestDTO accountRequestDTO) {
        Account account = new Account();

        account.setEmail(accountRequestDTO.email());
        account.setPassword(accountRequestDTO.password());
        account.setRoles(new ArrayList<>(RoleMapper.toRoleListFromDTO(accountRequestDTO.roles())));

        return account;
    }
}
