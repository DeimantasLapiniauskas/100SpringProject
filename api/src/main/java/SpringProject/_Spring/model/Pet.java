package SpringProject._Spring.model;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", insertable = false, updatable = false)
    private Client client;

    @Column(name = "owner_id")
    private long ownerId;

    private String name;
    private String species;
    private String breed;
    private LocalDate birthdate;

    private Gender gender;

    public Pet() {
    }

    public Pet(Client client, long owner_id, String name, String breed, String species, LocalDate birthdate, Gender gender) {
        this.client = client;
        this.ownerId = owner_id;
        this.name = name;
        this.breed = breed;
        this.species = species;
        this.birthdate = birthdate;
        this.gender = gender;
    }

    public long getId() {
        return id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(long owner_id) {
        this.ownerId = owner_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
}
