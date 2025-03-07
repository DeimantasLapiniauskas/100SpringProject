package SpringProject._Spring.dto.password;

import SpringProject._Spring.model.Account;

//This file is not necessary
public class PasswordUpdateMapper {


    public static void updatePasswordFromDTO(PasswordUpdateDTO passwordUpdateDTO, Account account) {

        account.setPassword(passwordUpdateDTO.newPassword());
    }
}
