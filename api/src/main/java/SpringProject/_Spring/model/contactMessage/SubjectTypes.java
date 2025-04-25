package SpringProject._Spring.model.contactMessage;

import jakarta.persistence.*;

@Entity
@Table(name = "subject_types")
public class SubjectTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public SubjectTypes(String name) {
        this.name = name;
    }

    public SubjectTypes() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
