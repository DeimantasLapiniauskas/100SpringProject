package SpringProject._Spring.service;

import SpringProject._Spring.model.ServiceAtClinic;
import SpringProject._Spring.repository.ServiceAtClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public boolean existsServiceById(long id) {
        return serviceAtClinicRepository.existsById(id);
    }

    public void deleteServiceById(long id) {
        serviceAtClinicRepository.deleteById(id);
    }

    public Optional<ServiceAtClinic> findAllServiceAtClinicById(long id) {
        return serviceAtClinicRepository.findById(id);
    }

    public Page<ServiceAtClinic> findAllServiceAtClinicPages(int page, int size, String sort) {
        if (sort == null) {
            Pageable pageable = PageRequest.of(page, size);
            return serviceAtClinicRepository.findAll(pageable);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return serviceAtClinicRepository.findAll(pageable);
    }

    public boolean isNotValidSortField(String sort) {
        List<String> validSortFields = List.of("name", "description", "price");

        return !validSortFields.contains(sort);
    }
}
