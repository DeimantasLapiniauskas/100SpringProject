package SpringProject._Spring.service;

import SpringProject._Spring.model.Post;
import SpringProject._Spring.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> findPostById(long id) {
        return postRepository.findById(id);
    }

    public void deletePostById(long id) {
        postRepository.deleteById(id);
    }

    public Page<Post> findAllPostsPage(int page, int size, String sort) {
        if (sort == null) {
            Pageable pageable = PageRequest.of(page, size);
            return  postRepository.findAllPost(pageable);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return  postRepository.findAllPost(pageable);
    }

    public boolean isNotValidField(String sort) {
        List<String> sortFields = List.of("title", "postType", "veterinarianId");

        return !sortFields.contains(sort);
    }
}
