package SpringProject._Spring.dto.service;

import SpringProject._Spring.model.ServiceAtClinic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;

public class ServiceAtClinicMapper {
    public static ServiceAtClinicResponseDTO toServiceAtClinicDTO(ServiceAtClinic service) {
        return new ServiceAtClinicResponseDTO(service.getId(), service.getName(), service.getDescription(), service.getPrice(), service.getImageUrl());
    }


    public static List<ServiceAtClinicResponseDTO> toServiceAtClinicListDTO(List<ServiceAtClinic> services) {
        return services.stream().map(s -> new ServiceAtClinicResponseDTO(s.getId(), s.getName(), s.getDescription(), s.getPrice(), s.getImageUrl())).toList();
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

    public static ServiceAtClinicPageResponseDTO toServiceAtClinicListPageDTO(Page<ServiceAtClinic> serviceAtClinicPage) {
        List<ServiceAtClinicResponseDTO> serviceAtClinicResponseListDTO =
                serviceAtClinicPage.getContent().stream()
                        .map(ServiceAtClinicMapper::toServiceAtClinicDTO)
                        .toList();

       return new ServiceAtClinicPageResponseDTO(
               serviceAtClinicResponseListDTO,
               serviceAtClinicPage.getTotalPages(),
               (int) serviceAtClinicPage.getTotalElements(),
               serviceAtClinicPage.getNumber(),
               serviceAtClinicPage.getSize()
       );
    }
}
