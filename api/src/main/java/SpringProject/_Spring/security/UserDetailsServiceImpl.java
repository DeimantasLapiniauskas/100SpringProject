package SpringProject._Spring.security;

import SpringProject._Spring.model.Account;
import SpringProject._Spring.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AccountService accountService;

    @Autowired
    public UserDetailsServiceImpl(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> foundAccount = accountService.findByEmail(email);

        if (foundAccount.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }

        return foundAccount.get();
    }

}
