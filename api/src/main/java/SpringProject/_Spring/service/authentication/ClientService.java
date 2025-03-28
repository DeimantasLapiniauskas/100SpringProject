package SpringProject._Spring.service.authentication;


import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.repository.authentication.AccountRepository;
import SpringProject._Spring.repository.authentication.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, AccountRepository accountRepository) {
        this.clientRepository = clientRepository;
        this.accountRepository = accountRepository;
    }

    public long findClientIdByEmail(String email) {
        if (!clientRepository.existsByAccount_Email(email)) {
            return -1;
        }
        return clientRepository.findByAccount_Email(email).get().getId();
    }

    public boolean existsClientById(long id) {
        return clientRepository.existsById(id);
    }

    public Client findClientByAccountId(long id) {
        return clientRepository.findByAccountId(id);
    }

    public Client saveClient(Account account, Client client) {
        accountRepository.save(account);
        client.setAccount(account);
        return clientRepository.save(client);
    }


    public Optional<Client> findClientById(long id) {
        return clientRepository.findById(id);
    }

    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    public Page<Client> findAllClientsPage(int page, int size, String sort) {
        if (sort == null) {
            Pageable pageable = PageRequest.of(page, size);
            return clientRepository.findAll(pageable);

        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return clientRepository.findAll(pageable);
    }
}
