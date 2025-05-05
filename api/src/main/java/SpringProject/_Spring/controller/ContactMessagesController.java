package SpringProject._Spring.controller;

import SpringProject._Spring.dto.contactMessages.ContactMessageMapper;
import SpringProject._Spring.dto.contactMessages.ContactMessageRequestDTO;
import SpringProject._Spring.dto.contactMessages.ContactMessageResponseDTO;
import SpringProject._Spring.service.ContactMessageService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/api")
public class ContactMessagesController {

    private final ContactMessageService contactMessageService;

    @Autowired
    public ContactMessagesController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @Operation(summary = "Create a new contact messages")
    @PostMapping("/contact")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addContactMessage(@Valid @RequestBody ContactMessageRequestDTO contactDTO) {


        return ok(ContactMessageMapper.toContactMessageResponseDTO(contactMessageService.saveContactMessages(ContactMessageMapper.toContactMessages(contactDTO))));
    }

    @Operation(summary = "Get all contact messages")
    @GetMapping("/contact")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> getAllContactMessages() {
        return ok(ContactMessageMapper.toContactMessageResponseDTOList(contactMessageService.getAllContactMessages()));
    }

    @Operation(summary = "Get ContactMessage by Id")
    @GetMapping("/contact/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ContactMessageResponseDTO> getContactMessageById(@PathVariable long id) {
        return contactMessageService.getContactMessagesById(id).map(contactMessages -> ResponseEntity.ok(
                ContactMessageMapper.toContactMessageResponseDTO(contactMessages))).orElse(ResponseEntity.notFound().build());
    }
}
