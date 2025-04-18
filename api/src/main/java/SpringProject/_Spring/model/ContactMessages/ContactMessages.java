package SpringProject._Spring.model.ContactMessages;

import SpringProject._Spring.model.VetClinic;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "contact_messages")
public class ContactMessages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "subject_type_id")
    private long subject_type_id;

    @ManyToOne
    @JoinColumn(name = "vet_clinic_id")
    private VetClinic vet_clinic;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "message")
    private String message;

    @Column(name = "created_at")
    private Timestamp created_at;

    public ContactMessages(long subject_type_id, String email, String name, String message, Timestamp created_at) {
        this.subject_type_id = subject_type_id;
        this.email = email;
        this.name = name;
        this.message = message;
        this.created_at = created_at;
    }

    public ContactMessages() {

    }

    public VetClinic getVet_clinic() {
        return vet_clinic;
    }

    public void setVet_clinic(VetClinic vet_clinic) {
        this.vet_clinic = vet_clinic;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSubject_type_id() {
        return subject_type_id;
    }

    public void setSubject_type_id(long subject_type_id) {
        this.subject_type_id = subject_type_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
}
