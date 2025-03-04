package SpringProject._Spring.dto;

import SpringProject._Spring.model.Account;

public class PasswordUpdateMapper {


    public static void updatePasswordFromDTO(PasswordUpdateDTO passwordUpdateDTO, Account account) {
        account.setPassword(passwordUpdateDTO.newPassword());
    }
}
