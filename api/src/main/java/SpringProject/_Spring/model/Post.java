package SpringProject._Spring.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.security.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String text;

    @Enumerated(EnumType.STRING)
    private PostType postType;

    @ManyToOne()
    @JoinColumn(name = "veterinarian_id")
    private Vet vet;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private String imageUrl;

    public Post(String title, String text, PostType postType, Vet vet, LocalDateTime createdAt, String imageUrl) {
        this.title = title;
        this.text = text;
        this.postType = postType;
        this.vet = vet;
        this.createdAt = createdAt;
        this.imageUrl = imageUrl;
    }

    public Post() {
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public PostType getPostType() {
        return postType;
    }

    public void setPostType(PostType postType) {
        this.postType = postType;
    }

    public Vet getVet() {
        return vet;
    }

    public void setVet(Vet vet) {
        this.vet = vet;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
