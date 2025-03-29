package SpringProject._Spring.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "services")
public class ServiceAtClinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageURL;

    public ServiceAtClinic() {
    }

    public ServiceAtClinic(String name, String description, BigDecimal price, String imageURL) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageURL = imageURL;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
