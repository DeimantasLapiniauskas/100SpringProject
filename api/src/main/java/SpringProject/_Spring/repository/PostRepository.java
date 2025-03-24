package SpringProject._Spring.repository;

import SpringProject._Spring.model.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByPostType(String postType);
}
