package consolelog.global.support;

import consolelog.global.error.ErrorCode;
import consolelog.global.support.token.AuthorizationExtractor;
import consolelog.global.support.token.InvalidAccessTokenException;
import consolelog.global.support.token.InvalidRefreshTokenException;
import consolelog.global.support.token.TokenManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Objects;

@Component
// @Slf4j   // logging
public class AuthInterceptor implements HandlerInterceptor {
    // private static final Logger LOGGER = LoggerFactory.getLogger(AuthInterceptor.class);
    private final TokenManager tokenManager;

    public AuthInterceptor(TokenManager tokenManager) {
        this.tokenManager = tokenManager;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (isGetMethodExcludeNickname(request))
            return true;

        if (CorsUtils.isPreFlightRequest(request))
            return true;


//        Logging Method
//        if (isGetMethod(request)) {
//            LOGGER.info("prometheus" + request.getRequestURI());
//            return true;
//        }

        if (notExistHeader(request)) {
//            LOGGER.info("no header" + request.getRequestURI());
            throw new RuntimeException();
        }

        String token = AuthorizationExtractor.extractAccessToken(request);
        if (isInvalidToken(token)) {
//            LOGGER.info("no token" + request.getRequestURI());
            throw new InvalidAccessTokenException();
        }
        return true;
    }


    private boolean isGetMethodExcludeNickname(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase("GET") &&
                !(request.getRequestURI().equalsIgnoreCase("/api/v1/members/nickname")
                || request.getRequestURI().equalsIgnoreCase("/api/v1/posts/list/*"));
    }

    private boolean notExistHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        return Objects.isNull(authorizationHeader);
    }

    private boolean isInvalidToken(String token) {
        return !tokenManager.isValid(token);
    }

}
