package SpringProject._Spring.model;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "veterinarians")
public class Vet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String specialty;
    private String licenseNumber;
    private LocalDate hireDate;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Account account;

    @Column(name = "account_id")
    private long accountId;

    public Vet(String firstName,
               String lastName,
               String phoneNumber,
               String specialty,
               String licenseNumber,
               LocalDate hireDate,
               String email,
               String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.specialty = specialty;
        this.licenseNumber = licenseNumber;
        this.hireDate = hireDate;
        this.account = new Account(email, password, List.of(new Role("VET", 2)));
        this.accountId = account.getId();
    }

    public Vet() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.account.setId(accountId);
        this.accountId = accountId;
    }

    public String getEmail() {
        return account.getEmail();
    }

    public String getPassword() {
        return account.getPassword();
    }

    public void setEmail(String email) {
        account.setEmail(email);
    }

    public void setPassword(String password) {
        account.setPassword(password);
    }
}

