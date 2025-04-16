package SpringProject._Spring.controller;

import SpringProject._Spring.dto.ApiResponse;
import SpringProject._Spring.dto.contact_messages.ContactMessMapper;
import SpringProject._Spring.dto.contact_messages.ContactMessRequestDTO;
import SpringProject._Spring.dto.contact_messages.ContactMessResponseDTO;
import SpringProject._Spring.model.ContactMessages.ContactMessages;
import SpringProject._Spring.service.ContactMessagesService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api")
public class ContactMessagesController {

    private final ContactMessagesService contactMessagesService;

    @Autowired
    public ContactMessagesController(ContactMessagesService contactMessagesService) {
        this.contactMessagesService = contactMessagesService;
    }

    @Operation(summary = "Create a new contact messages")
    @PostMapping("/contactmessage")
    public ResponseEntity<?> addContactMessage(@Valid @RequestBody ContactMessRequestDTO contactDTO, Authentication authentication){
        ContactMessages savedContactMessages = contactMessagesService.saveContactMessages(
                ContactMessMapper.toContactMessages(contactDTO)
        );

        return ok(ContactMessMapper.toContactMessResponseDTO(savedContactMessages));
    }

//    @Operation(summary = "Get ContactMessage by Id")
//    @GetMapping("/contactmessage/{id}")
//    public ResponseEntity<ApiResponse<List<ContactMessResponseDTO>>> getContactMessageById(@PathVariable long id){
//
//        return ok(contactMessagesService.getContactMessagesById(id)
//                                        .stream().map(contactMessages ->
//                                        ContactMessMapper.toContactMessResponseDTO(contactMessages)).toList());
//    }

    @Operation(summary = "Get ContactMessage by Id")
    @GetMapping("/contactmessage/{id}")
    public ResponseEntity<ContactMessResponseDTO> getContactMessageById(@PathVariable long id){

        Optional<ContactMessages> results = contactMessagesService.getContactMessagesById(id);

        return results.map(contactMessages -> ResponseEntity.ok(ContactMessMapper.toContactMessResponseDTO(contactMessages))).orElse(ResponseEntity.notFound().build());
    }
}
