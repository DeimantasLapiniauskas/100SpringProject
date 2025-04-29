package SpringProject._Spring.dto.authentication.account;

import SpringProject._Spring.model.authentication.Account;

public class AccountMapper {

    public static AccountResponseDTO toAccountResponseDTO(Account account) {
        return new AccountResponseDTO(account.getId(), account.getEmail());
    }
}
