package SpringProject._Spring.dto;

import SpringProject._Spring.model.Servis;

import java.util.List;

public class ServisMapper {

  public static List<ServisDTO> toServisDTOList(List<Servis> serviss){
    List<ServisDTO> result = serviss.stream()
            .map(servis -> new ServisDTO(servis.getId(), servis.getName(), servis.getDescription(), servis.getPrice()))
            .toList();

    return result;
  }

  public static ServisDTO toServisDTO(Servis servis){

    return new ServisDTO(servis.getId(), servis.getName(), servis.getDescription(), servis.getPrice());
  }

  public static Servis toServis(ServisDTO servisDTO){
    Servis servis = new Servis();
    servis.setName(servisDTO.name());
    servis.setDescription(servisDTO.description());
    servis.setPrice(servisDTO.price());

    return servis;
  }
}
