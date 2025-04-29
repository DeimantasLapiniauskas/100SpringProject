package SpringProject._Spring.service.authentication;

import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.repository.authentication.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
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

    public boolean verifyAccountPassword(Account account, String password) {
        return passwordEncoder.matches(password, account.getPassword());
    }

    public void deleteAccount(long id) {
        Account account = findAccountById(id)
                .orElseThrow(() -> new NotFoundException("Account with id " + id + " not found"));

        accountRepository.delete(account);
    }
}
