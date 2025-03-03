package SpringProject._Spring.service;

import SpringProject._Spring.model.Account;
import SpringProject._Spring.repository.AccountRepository;
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
}
