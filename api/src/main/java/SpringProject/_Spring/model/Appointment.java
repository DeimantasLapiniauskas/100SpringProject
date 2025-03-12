package SpringProject._Spring.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "pet_id", insertable = false, updatable = false)
    private Pet pet;

    @Column(name = "pet_id")
    private long petId;

    @ManyToOne
    @JoinColumn(name = "veterinarian_id", insertable = false, updatable = false)
    private Vet vet;

    @Column(name = "veterinarian_id")
    private long vetId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "appointment_services",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<ServiceAtClinic> services = new ArrayList<>();

    private LocalDateTime appointmentDate;
    private String clinicAddress;

    @Enumerated(EnumType.STRING)
    private Status status;
    private String notes;
    private BigDecimal totalServicesSum;
    private Timestamp createdAt;

    public Appointment(long petId,
                       long vetId,
                       List<ServiceAtClinic> services,
                       LocalDateTime appointmentDate,
                       String notes,
                       Timestamp createdAt) {
        this.petId = petId;
        this.vetId = vetId;
        this.services = services;
        this.appointmentDate = appointmentDate;
        clinicAddress = "Here.";
        this.notes = notes;
        totalServicesSum = services.stream().map(ServiceAtClinic::getPrice).reduce(BigDecimal.valueOf(0), BigDecimal::add);
        this.createdAt = createdAt;
    }

    public Appointment() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPetId() {
        return petId;
    }

    public void setPetId(long petId) {
        this.petId = petId;
    }

    public long getVetId() {
        return vetId;
    }

    public void setVetId(long vetId) {
        this.vetId = vetId;
    }

    public List<ServiceAtClinic> getServices() {
        return services;
    }

    public void setServices(List<ServiceAtClinic> services) {
        this.services = services;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getClinicAddress() {
        return clinicAddress;
    }

    public void setClinicAddress(String clinicAddress) {
        this.clinicAddress = clinicAddress;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public BigDecimal getTotalServicesSum() {
        return totalServicesSum;
    }

    public void setTotalServicesSum(BigDecimal totalServicesSum) {
        this.totalServicesSum = totalServicesSum;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
