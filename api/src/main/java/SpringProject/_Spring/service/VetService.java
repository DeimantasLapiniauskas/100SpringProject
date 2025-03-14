package SpringProject._Spring.service;

import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Vet;
import SpringProject._Spring.repository.AccountRepository;
import SpringProject._Spring.repository.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VetService {
    private final VetRepository vetRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public VetService(VetRepository vetRepository, AccountRepository accountRepository) {
        this.vetRepository = vetRepository;
        this.accountRepository = accountRepository;
    }

    public Vet saveVet(Account account, Vet vet) {
        accountRepository.save(account);
        vet.setAccount(account);
        return vetRepository.save(vet);
    }

    public Optional<Vet> getVetById(long vetId) {
        return vetRepository.findById(vetId);
    }
}
