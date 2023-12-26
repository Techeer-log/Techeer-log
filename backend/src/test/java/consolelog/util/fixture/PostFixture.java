package consolelog.util.fixture;

import consolelog.post.domain.Post;
import consolelog.post.dto.request.NewPostRequest;

import static consolelog.util.fixture.MemberFixture.M1;

public class PostFixture {

    public static final NewPostRequest NEW_POST_REQUEST = new NewPostRequest("제목", "본문", "");
    public static final NewPostRequest NEW_POST_REQUEST2 = new NewPostRequest("제목2", "본문2", "");
    public static final NewPostRequest NEW_POST_REQUEST3 = new NewPostRequest("제목3", "본문3", "");
    public static final String VALID_TITLE = "제목";
    public static final String VALID_CONTENT = "본문";
    public static final Post P1 = Post.builder()
            .id(1L)
            .title(VALID_TITLE)
            .content(VALID_CONTENT)
            .member(M1)
            .build();
}
