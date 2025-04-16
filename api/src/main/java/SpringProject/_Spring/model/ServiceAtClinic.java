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
    private String imageUrl;

    public ServiceAtClinic() {
    }

    public ServiceAtClinic(String name, String description, BigDecimal price, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public ServiceAtClinic(String name, String description, BigDecimal price) {
        this.name = name;
        this.description = description;
        this.price = price;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageURL) {
        this.imageUrl = imageURL;
    }
}
