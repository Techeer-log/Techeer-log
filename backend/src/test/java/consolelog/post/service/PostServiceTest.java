package consolelog.post.service;

import consolelog.auth.dto.AuthInfo;
import consolelog.member.domain.Member;
import consolelog.member.repository.MemberRepository;
import consolelog.post.domain.Post;
import consolelog.post.domain.ViewCountManager;
import consolelog.post.dto.request.NewPostRequest;
import consolelog.post.dto.request.PostUpdateRequest;
import consolelog.post.dto.response.PagePostResponse;
import consolelog.post.dto.response.PostResponse;
import consolelog.post.exception.PostNotFoundException;
import consolelog.post.repository.PostRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static consolelog.util.fixture.MemberFixture.M1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.*;


@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    private static final String EMPTY_COOKIE_VALUE = "";
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private ViewCountManager viewCountManager;
    @InjectMocks
    private PostService postService;
    private Post post1, post2;
    private AuthInfo authInfo;

    @BeforeEach
    void setUp() {
        post1 = Post.builder()
                .id(1L)
                .title("제목1")
                .content("본문1")
                .member(M1)
                .postLikes(new ArrayList<>())
                .comments(new ArrayList<>())
                .build();
        post2 = Post.builder()
                .id(2L)
                .title("제목2")
                .content("본문2")
                .member(M1)
                .postLikes(new ArrayList<>())
                .comments(new ArrayList<>())
                .build();

        authInfo = new AuthInfo(M1.getId(),"USER", M1.getNickname());

    }
    @AfterEach
    void tearDown() {

    }
    @DisplayName("게시글 상세 조회를 성공한다.")
    @Test
    void findPost() {

        given(postRepository.findById(1L)).willReturn(Optional.of(post1));

        Post foundPost = postRepository.findById(1L).orElseThrow();
        PostResponse postResponse = PostResponse.from(foundPost);

        assertThat(postResponse).isNotNull();
        assertThat(postResponse.getId()).isEqualTo(post1.getId());
    }

    @DisplayName("게시글 상세 조회를 실패하면 예외를 발생시킨다.")
    @Test
    void failFindPost() {
        given(postRepository.findById(anyLong())).willReturn(Optional.empty());

        assertThatThrownBy(() -> postService.findPost(1L, EMPTY_COOKIE_VALUE))
                .isInstanceOf(PostNotFoundException.class);
    }
    @DisplayName("게시글 목록을 조회할 때 lastPostId를 0으로 설정하면 마지막 PostId로 조회한다.")
    @Test
    void findPostsByPage_first() {
        final Pageable pageable = PageRequest.of(0, 1);
        final Long lastPostId = 0L;
        Slice<Post> fakeSlice = new SliceImpl<>(Arrays.asList(post2, post1));

        given(postRepository.findNextPage(pageable)).willReturn(fakeSlice);

        PagePostResponse pagePostResponse = postService.findPostsByPage(lastPostId, pageable);

        assertAll(
                () -> assertThat(pagePostResponse.getPosts()).hasSize(2),
                () -> assertThat(pagePostResponse.getPosts())
                        .extracting("title")
                        .containsExactly("제목2", "제목1")
        );
    }
    @DisplayName("게시글 목록을 조회할 때 lastPostId를 0으로 설정하면 마지막 PostId로 조회한다.")
    @Test
    void findPostsByPage_else() {
        final Long lastPostId = 3L;
        final Pageable pageable = PageRequest.of(0, 2);
        Slice<Post> fakeSlice = new SliceImpl<>(Arrays.asList(post2, post1));
        //given
        given(postRepository.findPostByIdIsLessThanOrderByIdDesc(lastPostId, pageable)).willReturn(fakeSlice);
        //when
        PagePostResponse pagePostResponse = postService.findPostsByPage(lastPostId, pageable);
        //then

        assertAll(
                () -> assertThat(pagePostResponse.getPosts()).hasSize(2),
                () -> assertThat(pagePostResponse.getPosts())
                        .extracting("title")
                        .containsExactly("제목2", "제목1")
        );
    }

    @DisplayName("게시글을 추가한다.")
    @Test
    void addPost() {
        NewPostRequest newPostRequest = new NewPostRequest("제목1", "본문1", "");

        given(memberRepository.findById(authInfo.getId())).willReturn(Optional.of(M1));

        Post post = createPost(newPostRequest, M1);
        when(postRepository.save(post)).thenReturn(post1);

        Long postId = postService.addPost(newPostRequest, authInfo);

        assertAll(
                () -> assertThat(postId).isEqualTo(post1.getId()),
                () -> assertThat(newPostRequest.getTitle()).isEqualTo(post1.getTitle()),
                () -> assertThat(newPostRequest.getContent()).isEqualTo(post1.getContent()),
                () -> assertThat(post1.getMember().getId()).isEqualTo(authInfo.getId()),
                () -> assertThat(post1.getMember().getNickname()).isEqualTo(authInfo.getNickname())
        );
    }
    private Post createPost(NewPostRequest newPostRequest, Member m1) {
        return Post.builder()
                .title(newPostRequest.getTitle())
                .content(newPostRequest.getContent())
                .member(m1)
                .build();
    }
    @DisplayName("게시글을 수정한다.")
    @Test
    void updatePost() {
        PostUpdateRequest postUpdateRequest = new PostUpdateRequest("제목수정", "본문수정", "");

        post1.updateTitle(postUpdateRequest.getTitle());
        post1.updateContent(postUpdateRequest.getContent());

        assertAll(
                () -> assertThat(post1.getTitle()).isEqualTo(postUpdateRequest.getTitle()),
                () -> assertThat(post1.getContent()).isEqualTo(postUpdateRequest.getContent())
        );
    }
}
