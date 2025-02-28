package SpringProject._Spring.dto;

import SpringProject._Spring.model.ServiceAtClinic;

import java.util.List;

public class ServiceAtClinicMapper {
  public static ServiceAtClinicDTO toServiceAtClinicDTO(ServiceAtClinic service){
    return new ServiceAtClinicDTO(service.getId(), service.getName(), service.getDescription(), service.getPrice());
  }

  public static List<ServiceAtClinicDTO> toServiceAtClinicDTO(List<ServiceAtClinic> services){
    return services.stream().map( s ->  new ServiceAtClinicDTO(s.getId(), s.getName(), s.getDescription(), s.getPrice())).toList();
  }
}