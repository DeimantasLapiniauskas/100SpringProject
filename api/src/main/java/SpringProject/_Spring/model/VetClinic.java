package SpringProject._Spring.model;
import SpringProject._Spring.model.appointment.Appointment;
import SpringProject._Spring.model.authentication.Vet;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vet_clinic")
public class VetClinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name = "Happy Hearts Veterinary Clinic";
    private String address = "Pavasario Avenue 100, Vilnius";
    private String email = "happyheartsclinic@gmail.com";
    private String phone = "+370 511 233 78";

    @OneToMany(mappedBy = "vetClinic", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Review> reviews;

    @OneToMany(mappedBy = "vetClinic", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Appointment> appointments;

    @OneToMany(mappedBy = "vetClinic", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Vet> vets;

    public VetClinic( String name, String address, String email, String phone) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.reviews = new ArrayList<>();
        this.appointments = new ArrayList<>();
        this.vets= new ArrayList<>();
    }

    public VetClinic() {

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public List<Vet> getVets() {
        return vets;
    }

    public void setVets(List<Vet> vets) {
        this.vets = vets;
    }


}
