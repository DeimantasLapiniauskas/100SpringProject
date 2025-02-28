package SpringProject._Spring.controller;

import SpringProject._Spring.service.ServisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServisController {

  private final ServisService servisService;

  public ServisController(ServisService servisService) {
    this.servisService = servisService;
  }

  @DeleteMapping("/service/{id}")
  public ResponseEntity<Void> deleteServis(@PathVariable long id){
    if (!servisService.existsServisById(id)){
      return ResponseEntity.notFound().build();
    }

    servisService.deleteServisById(id);
    return ResponseEntity.noContent().build();
  }
}
