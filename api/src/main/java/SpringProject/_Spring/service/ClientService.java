package SpringProject._Spring.service;


import SpringProject._Spring.model.Account;
import SpringProject._Spring.model.Client;
import SpringProject._Spring.repository.AccountRepository;
import SpringProject._Spring.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository, AccountRepository accountRepository) {
        this.clientRepository = clientRepository;
        this.accountRepository = accountRepository;
    }

    public long findAccountIdByEmail(String email) {
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


}
