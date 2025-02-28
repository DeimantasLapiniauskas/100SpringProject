package SpringProject._Spring.service;

import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.repository.ServiceAtClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceAtClinicService {
    private final ServiceAtClinicRepository serviceAtClinicRepository;

    @Autowired

    public ServiceAtClinicService(ServiceAtClinicRepository serviceAtClinicRepository) {
        this.serviceAtClinicRepository = serviceAtClinicRepository;
    }

    public boolean existsServiceByName(String name) {
        return serviceAtClinicRepository.existsByName(name);
    }

    public ServiceAtClinic saveService(ServiceAtClinic service) {
        return serviceAtClinicRepository.save(service);
    }
}
