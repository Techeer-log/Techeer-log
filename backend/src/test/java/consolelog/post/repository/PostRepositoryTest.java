package consolelog.post.repository;

import consolelog.global.config.JPAConfig;
import consolelog.member.repository.MemberRepository;
import consolelog.post.domain.Post;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;

import static consolelog.util.fixture.MemberFixture.M1;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(JPAConfig.class)
class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;
    @Autowired
    MemberRepository memberRepository;

    @PersistenceContext
    private EntityManager em;

    private Post post1;
    private Post post2;
    private Post post3;
    private Post post4;
    private Post post5;

    @BeforeEach
    void setUp() {
        post1 = Post.builder()
                .title("title1")
                .content("content1")
                .member(M1)
                .build();
        post2 = Post.builder()
                .title("title2")
                .content("content2")
                .member(M1)
                .build();
        post3 = Post.builder()
                .title("title3")
                .content("content3")
                .member(M1)
                .build();
        post4 = Post.builder()
                .title("title4")
                .content("content4")
                .member(M1)
                .build();
        post5 = Post.builder()
                .title("title5")
                .content("content5")
                .member(M1)
                .build();
        memberRepository.save(M1);
        postRepository.save(post1);
        postRepository.save(post2);
        postRepository.save(post3);
        postRepository.save(post4);
        postRepository.save(post5);
    }

    @Test
    void findPostByIdIsLessThanOrderByIdDesc() {
        // given
        PageRequest pageable = PageRequest.of(0, 10);
        Long maxId1 = 6L;
        // when
        Slice<Post> slice1 = postRepository.findPostByIdIsLessThanOrderByIdDesc(maxId1, pageable);
        // then
        assertThat(slice1.getContent()).containsExactly(post5, post4, post3, post2, post1);
    }

    @Test
    void findNextPage() {
        //given
        PageRequest pageable = PageRequest.of(0, 10);
        //when
        Slice<Post> slice = postRepository.findNextPage(pageable);
        //then
        assertThat(slice.getContent()).containsExactly(post5, post4, post3, post2, post1);
    }

    @Test
    void findMaxId() {
        Long maxId = postRepository.findMaxId();
        assertThat(maxId).isEqualTo(5L);
    }
    @Test
    void increaseLikeCount() {
        int originLikeCount = post1.getLikeCount();

        postRepository.increaseLikeCount(post1.getId());

        Post post = postRepository.findById(post1.getId()).orElseThrow();
        assertThat(post.getLikeCount()).isEqualTo(originLikeCount + 1);
    }

    @Test
    void decreaseLikeCount() {
        postRepository.increaseLikeCount(post1.getId());
        int originLikeCount = postRepository.findById(post1.getId()).orElseThrow().getLikeCount();

        postRepository.decreaseLikeCount(post1.getId());

        Post post = postRepository.findById(post1.getId()).orElseThrow();

        assertThat(post.getLikeCount()).isEqualTo(originLikeCount - 1);
    }
}
