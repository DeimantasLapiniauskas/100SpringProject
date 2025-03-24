package SpringProject._Spring.dto.authentication.password;

import SpringProject._Spring.model.authentication.Account;

//This file is not necessary
public class PasswordUpdateMapper {


    public static void updatePasswordFromDTO(PasswordUpdateDTO passwordUpdateDTO, Account account) {

        account.setPassword(passwordUpdateDTO.newPassword());
    }
}
