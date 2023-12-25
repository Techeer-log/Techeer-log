package consolelog.helper;

import consolelog.global.support.AuthInterceptor;
import consolelog.global.support.token.AuthenticationPrincipalArgumentResolver;
import consolelog.global.support.token.TokenManager;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class ControllerTestHelper {

    @MockBean
    private AuthInterceptor authInterceptor;

    @MockBean
    protected TokenManager tokenManager;

    @MockBean
    private AuthenticationPrincipalArgumentResolver authenticationPrincipalArgumentResolver;

    @BeforeEach
    void setUp() {
        when(authInterceptor.preHandle(any(), any(), any()))
                .thenReturn(true);
        when(authenticationPrincipalArgumentResolver.resolveArgument(any(), any(), any(), any()))
                .thenReturn("Bearer Token");
        when(authenticationPrincipalArgumentResolver.supportsParameter(any()))
                .thenReturn(true);
    }
}
