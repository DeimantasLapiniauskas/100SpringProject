package SpringProject._Spring.service;

import SpringProject._Spring.model.Vet;
import SpringProject._Spring.repository.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VetService {
    private final VetRepository vetRepository;

    @Autowired
    public VetService(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    public Vet saveVet(Vet vet) {
        return vetRepository.save(vet);
    }
}
