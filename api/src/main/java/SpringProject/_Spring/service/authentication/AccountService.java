package SpringProject._Spring.service.authentication;

import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.repository.authentication.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public boolean existsAccountByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public Optional<Account> findAccountById(long id) {
        return accountRepository.findById(id);
    }

    public boolean existsAccountById(long id) {
        return accountRepository.existsById(id);
    }

    public Long findIdByEmail(String email) {
        return accountRepository.findByEmail(email).get().getId();
        //warning: not Optional<>
    }
}
