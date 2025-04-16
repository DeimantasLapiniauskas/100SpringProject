package SpringProject._Spring.service.authentication;

import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.repository.VetClinicRepository;
import SpringProject._Spring.repository.authentication.AccountRepository;
import SpringProject._Spring.repository.authentication.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VetService {
    private final VetRepository vetRepository;
    private final AccountRepository accountRepository;
    private final VetClinicRepository vetClinicRepository;

    @Autowired
    public VetService(VetRepository vetRepository, AccountRepository accountRepository, VetClinicRepository vetClinicRepository) {
        this.vetRepository = vetRepository;
        this.accountRepository = accountRepository;
        this.vetClinicRepository = vetClinicRepository;
    }

    public Vet saveVet(Account account, Vet vet) {
        accountRepository.save(account);
        vet.setAccount(account);
        vet.setVetClinic(vetClinicRepository.findAll().stream().findFirst().orElseThrow(() -> new NotFoundException("Vet clinic not found")));
        return vetRepository.save(vet);
    }

    public Vet updateVet(Vet vet) {
        return vetRepository.save(vet);
    }

    public Optional<Vet> getVetById(long vetId) {
        return vetRepository.findById(vetId);
    }

    public Optional<Vet> findVetByAccountEmail(String email) {
        return vetRepository.findByAccount_email(email);
    }

    public List<Vet> getAllVets() {
        return vetRepository.findAll();
    }

    public boolean existsVetById(long id) {
        return vetRepository.existsById(id);
    }

    public Page<Vet> findAllVetsPage(int page, int size, String sort) {
        if (sort == null) {
            Pageable pageable = PageRequest.of(page, size);
            return vetRepository.findAll(pageable);

        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return vetRepository.findAll(pageable);
    }
}
