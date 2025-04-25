package SpringProject._Spring.controller;

import SpringProject._Spring.dto.contact_messages.ContactMessageMapper;
import SpringProject._Spring.dto.contact_messages.ContactMessageRequestDTO;
import SpringProject._Spring.dto.contact_messages.ContactMessageResponseDTO;
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
    @PostMapping("/contactmessage")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> addContactMessage(@Valid @RequestBody ContactMessageRequestDTO contactDTO) {


        return ok(ContactMessageMapper.toContactMessageResponseDTO(contactMessageService.saveContactMessages(ContactMessageMapper.toContactMessages(contactDTO))));
    }

    @Operation(summary = "Get all contact messages")
    @GetMapping("/contactmessage")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<?> getAllContactMessages() {
        return ok(ContactMessageMapper.toContactMessageResponseDTOList(contactMessageService.getAllContactMessages()));
    }

    @Operation(summary = "Get ContactMessage by Id")
    @GetMapping("/contactmessage/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_CLIENT')")
    public ResponseEntity<ContactMessageResponseDTO> getContactMessageById(@PathVariable long id) {
        return contactMessageService.getContactMessagesById(id).map(contactMessages -> ResponseEntity.ok(
                ContactMessageMapper.toContactMessageResponseDTO(contactMessages))).orElse(ResponseEntity.notFound().build());
    }
}
