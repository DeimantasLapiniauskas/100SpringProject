package SpringProject._Spring.service;

import SpringProject._Spring.repository.ServisRepository;
import org.springframework.stereotype.Service;

@Service
public class ServisService {

  private final ServisRepository servisRepository;

  public ServisService(ServisRepository servisRepository) {
    this.servisRepository = servisRepository;
  }

  public boolean existsServisById(long id){
    return servisRepository.existsById(id);
  }
  public void deleteServisById(long id){
    servisRepository.deleteById(id);
  }
}
