package SpringProject._Spring.service;

import SpringProject._Spring.dto.ServiceAtClinicRequestDTO;
import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.repository.ServiceAtClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<ServiceAtClinic> findAllServiceAtClinic() {
        return serviceAtClinicRepository.findAll();
    }

    public Optional<ServiceAtClinic> findServiceAtClinicById(long id) {
       return serviceAtClinicRepository.findById(id);
    }

    public Optional<ServiceAtClinic> findServiceAtClinicByName(String name) {
        return serviceAtClinicRepository.findByName(name);
    }

    public ServiceAtClinic updateServiceAtClinic(ServiceAtClinicRequestDTO serviceAtClinicRequestDTO, ServiceAtClinic serviceAtClinic) {
        serviceAtClinic.setName(serviceAtClinicRequestDTO.name());
        serviceAtClinic.setDescription(serviceAtClinicRequestDTO.description());
        serviceAtClinic.setPrice(serviceAtClinicRequestDTO.price());
        return serviceAtClinic;
    }
}
