package SpringProject._Spring.dto.service;

import SpringProject._Spring.model.ServiceAtClinic;

import java.util.List;

public class ServiceAtClinicMapper {
    public static ServiceAtClinicResponseDTO toServiceAtClinicDTO(ServiceAtClinic service) {
        return new ServiceAtClinicResponseDTO(service.getId(), service.getName(), service.getDescription(), service.getPrice());
    }


    public static List<ServiceAtClinicResponseDTO> toServiceAtClinicListDTO(List<ServiceAtClinic> services) {
        return services.stream().map(s -> new ServiceAtClinicResponseDTO(s.getId(), s.getName(), s.getDescription(), s.getPrice())).toList();
    }

    public static ServiceAtClinic toServiceAtClinic(ServiceAtClinicRequestDTO serviceAtClinicRequestDTO) {
        return new ServiceAtClinic();
    }

    public static ServiceAtClinic updateServiceAtClinic(ServiceAtClinicRequestDTO serviceAtClinicRequestDTO, ServiceAtClinic serviceAtClinic) {
        serviceAtClinic.setName(serviceAtClinicRequestDTO.name());
        serviceAtClinic.setDescription(serviceAtClinicRequestDTO.description());
        serviceAtClinic.setPrice(serviceAtClinicRequestDTO.price());
        return serviceAtClinic;
    }
}
