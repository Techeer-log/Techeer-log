package consolelog.post.service;

import consolelog.auth.dto.AuthInfo;
import consolelog.member.repository.MemberRepository;
import consolelog.post.domain.Post;
import consolelog.post.dto.request.NewPostRequest;
import consolelog.post.dto.request.PostUpdateRequest;
import consolelog.post.dto.response.PagePostResponse;
import consolelog.post.dto.response.PostResponse;
import consolelog.post.exception.PostNotFoundException;
import consolelog.post.repository.PostRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Optional;

import static consolelog.util.fixture.MemberFixture.M1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.data.domain.Sort.Direction.DESC;

@SpringBootTest
class PostServiceTest {

    private static final String EMPTY_COOKIE_VALUE = "";

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @PersistenceContext
    private EntityManager em;

    private Post post1;
    private AuthInfo authInfo;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        memberRepository.save(M1);
        authInfo = new AuthInfo(M1.getId(), M1.getRoleType().getName(), M1.getNickname());
        post1 = Post.builder()
                .title("제목")
                .content("본문")
                .member(M1)
                .comments(new ArrayList<>())
                .postLikes(new ArrayList<>())
                .build();
    }
    @DisplayName("게시글 조회")
    @Test
    void findPost() {
        Post post = postRepository.save(post1);

        Post foundPost = postRepository.findById(post.getId()).orElseThrow();
        PostResponse postResponse = PostResponse.from(foundPost);


        assertAll(
                () -> assertThat(postResponse.getId()).isEqualTo(post.getId()),
                () -> assertThat(postResponse.getContent()).isEqualTo(post.getContent()),
                () -> assertThat(postResponse.getNickname()).isEqualTo(post.getMember().getNickname()),
                () -> assertThat(postResponse.getLikeCount()).isEqualTo(post.getLikeCount()),
                () -> assertThat(postResponse.getViewCount()).isEqualTo(post.getViewCount()),
                () -> assertThat(postResponse.getCommentCount()).isEqualTo(post.getCommentCount()),
                () -> assertThat(postResponse.getCreatedAt()).isEqualTo(post.getCreatedAt()),
                () -> assertThat(postResponse.getUpdatedAt()).isEqualTo(post.getUpdatedAt())
        );
    }
    @DisplayName("게시글 조회_")
    @Test
    void findPost_() {
        Post post = postRepository.save(post1);

        PostResponse postResponse = postService.findPost(post.getId(), EMPTY_COOKIE_VALUE);

        assertAll(
                () -> assertThat(postResponse.getId()).isEqualTo(post.getId()),
                () -> assertThat(postResponse.getContent()).isEqualTo(post.getContent()),
                () -> assertThat(postResponse.getNickname()).isEqualTo(post.getMember().getNickname()),
                () -> assertThat(postResponse.getLikeCount()).isEqualTo(post.getLikeCount()),
                () -> assertThat(postResponse.getViewCount()).isEqualTo(post.getViewCount()),
                () -> assertThat(postResponse.getCommentCount()).isEqualTo(post.getCommentCount()),
                () -> assertThat(postResponse.getCreatedAt()).isEqualTo(post.getCreatedAt()),
                () -> assertThat(postResponse.getUpdatedAt()).isEqualTo(post.getUpdatedAt())
        );
    }
    @DisplayName("게시글 목록 첫 조회")
    @Test
    void findPostsByPage_first() {
        Long lastPostId = 0L;
        postService.addPost(new NewPostRequest("제목1", "본문1"), authInfo);
        postService.addPost(new NewPostRequest("제목2", "본문2"), authInfo);
        postService.addPost(new NewPostRequest("제목3", "본문3"), authInfo);

        Pageable pageable = PageRequest.of(0, 2);
        PagePostResponse pagePostResponse = postService.findPostsByPage(lastPostId, pageable);

        assertAll(
                () -> assertThat(pagePostResponse.getPosts()).hasSize(2),
                () -> assertThat(pagePostResponse.getPosts())
                        .extracting("title")
                        .containsExactly("제목3", "제목2")
        );
    }
    @DisplayName("게시글 목록 postId로 조회")
    @Test
    void findPostsByPage_else() {
        Long lastPostId = 3L;
        postService.addPost(new NewPostRequest("제목1", "본문1"), authInfo);
        postService.addPost(new NewPostRequest("제목2", "본문2"), authInfo);
        postService.addPost(new NewPostRequest("제목3", "본문3"), authInfo);

        Pageable pageable = PageRequest.of(0, 2);
        PagePostResponse pagePostResponse = postService.findPostsByPage(lastPostId, pageable);

        assertAll(
                () -> assertThat(pagePostResponse.getPosts()).hasSize(2),
                () -> assertThat(pagePostResponse.getPosts())
                        .extracting("title")
                        .containsExactly("제목2", "제목1")
        );
    }
    @DisplayName("게시글 조회 시 조회수 증가")
    @Test
    void findPost_viewCount() {
        Post post = postRepository.save(post1);
        int beforeViewCount = post.getViewCount();
        postService.findPost(post.getId(), EMPTY_COOKIE_VALUE);
        em.clear();

        int updateViewCount = postRepository.findById(post.getId()).orElseThrow().getViewCount();

        assertThat(updateViewCount).isEqualTo(beforeViewCount + 1);
    }

    @Test
    void addPost() {
        NewPostRequest newPostRequest = new NewPostRequest("제목", "본문");

        Long postId = postService.addPost(newPostRequest, authInfo);
        Post post = postRepository.findById(postId).orElseThrow();

        assertAll(
                () -> assertThat(newPostRequest.getTitle()).isEqualTo(post.getTitle()),
                () -> assertThat(newPostRequest.getContent()).isEqualTo(post.getContent()),
                () -> assertThat(post.getMember().getId()).isEqualTo(authInfo.getId()),
                () -> assertThat(post.getMember().getNickname()).isEqualTo(authInfo.getNickname()),
                () -> assertThat(post.getCreatedAt()).isNotNull()
        );
    }

    @Test
    void updatePost() {
        Post post = postRepository.save(post1);
        PostUpdateRequest postUpdateRequest = new PostUpdateRequest("제목수정", "본문수정");

        postService.updatePost(post.getId(), postUpdateRequest, authInfo);

        Post foundPost = postRepository.findById(post.getId())
                .orElseThrow(PostNotFoundException::new);
        assertAll(
                () -> assertThat(foundPost.getTitle()).isEqualTo(postUpdateRequest.getTitle()),
                () -> assertThat(foundPost.getContent()).isEqualTo(postUpdateRequest.getContent()),
                () -> assertThat(foundPost.getUpdatedAt()).isNotNull()
        );

    }

    @Test
    void deletePost() {
        Post post = postRepository.save(post1);

        postService.deletePost(post.getId(), authInfo);

        Optional<Post> foundPost = postRepository.findById(post.getId());

        assertThat(foundPost).isEmpty();
    }
}