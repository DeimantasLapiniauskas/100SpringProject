package SpringProject._Spring.service;

import SpringProject._Spring.dto.post.PostRequestDTO;
import SpringProject._Spring.model.post.Post;
import SpringProject._Spring.model.post.PostType;
import SpringProject._Spring.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
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

    public Post updatePost(Post post, PostRequestDTO postRequestDTO) {
        post.setTitle(postRequestDTO.title());
        post.setContent(postRequestDTO.content());
        post.setPostType(postRequestDTO.postType());
        post.setImageUrl(postRequestDTO.imageUrl());
        savePost(post);

        return post;
    }

    public Page<Post> findAllPostsPage(int page, int size, String sort, String search) {
        if (sort == null ) {

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            if (search == null ) {
                return postRepository.findAll(pageable);
            }

            return postRepository.searchAllFields(search.toLowerCase(), pageable);
        }

        if (sort.equals("createdAt")) {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());
            return postRepository.findAll(pageable);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        PostType postType = PostType.valueOf(sort);

        if (search == null) {
            return postRepository.findByPostType(postType, pageable);
        }
        return postRepository.searchInPostType(search.toLowerCase(), postType ,pageable);
    }

    public boolean isNotValidSortField(String sort) {
        List<String> sortFields = List.of("News", "Sale", "Blog", "PetCare", "createdAt");

        return !sortFields.contains(sort);
    }
}
