package consolelog.util;

import consolelog.auth.controller.AuthController;
import consolelog.auth.domain.RefreshToken;
import consolelog.comment.controller.CommentController;
import consolelog.global.support.AuthInterceptor;
import consolelog.global.support.token.AuthenticationPrincipalArgumentResolver;
import consolelog.global.support.token.TokenManager;
import consolelog.like.controller.LikeController;
import consolelog.member.controller.MemberController;
import consolelog.post.controller.PostController;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.context.WebApplicationContext;

@WebMvcTest({
        PostController.class,
        MemberController.class,
        AuthController.class,
        CommentController.class,
        LikeController.class,
})

public class ControllerTest {


    @MockBean
    protected PostController postController;
    @MockBean
    protected MemberController memberController;
    @MockBean
    protected AuthController authController;
    @MockBean
    protected CommentController commentController;
    @MockBean
    protected LikeController likeController;
    @MockBean
    protected TokenManager tokenManager;
    @MockBean
    protected AuthInterceptor authInterceptor;
    @MockBean
    protected AuthenticationPrincipalArgumentResolver authenticationPrincipalArgumentResolver;
    @MockBean
    protected RefreshToken refreshToken;


    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext) {
    }
}
