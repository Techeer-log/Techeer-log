package com.techeerlog.global.support;

import com.techeerlog.global.exception.AnonymousNotAllowedException;
import com.techeerlog.global.exception.InvalidAccessTokenException;
import com.techeerlog.global.exception.NoAccessTokenException;
import com.techeerlog.global.support.token.AuthorizationExtractor;
import com.techeerlog.global.support.token.TokenManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    private final TokenManager tokenManager;
    private final Set<String> anonymousAllowedPaths;

    public AuthInterceptor(TokenManager tokenManager) {
        this.tokenManager = tokenManager;
        this.anonymousAllowedPaths = new HashSet<>(Arrays.asList(
                "/api/v1/auth/login",
                "/api/v1/members/signup",
                "/api/v1/members/signup/admin"
        ));
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (CorsUtils.isPreFlightRequest(request))
            return true;

//        Logging Method
//        if (isGetMethod(request)) {
//            LOGGER.info("prometheus" + request.getRequestURI());
//            return true;
//        }

        if (notExistHeader(request)) {
            throw new NoAccessTokenException();
        }

        if (isRefreshMethod(request.getRequestURI()))
            return true;

        String token = AuthorizationExtractor.extractAccessToken(request);

        if (isInvalidToken(token)) {
            throw new InvalidAccessTokenException();
        }

        if (isGetMethod(request))
            return true;

        // Post, Put, Delete method
        if (isAnonymousNotAllowed(request.getRequestURI(), token)) {
            throw new AnonymousNotAllowedException();
        }
        return true;
    }

    private boolean isRefreshMethod(String requestURI) {
        return requestURI.equals("/api/v1/auth/refresh");
    }

    private boolean isAnonymousNotAllowed(String requestURI, String token) {
        if (isAnonymousAllowedPath(requestURI))
            return false;

        return isAnonymousToken(token);
    }



    private boolean isGetMethod(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase("GET");
    }

    private boolean notExistHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        return Objects.isNull(authorizationHeader);
    }

    private boolean isInvalidToken(String token) {
        return !tokenManager.isValid(token);
    }

    private boolean isAnonymousAllowedPath(String requestURI) {
        for (String path : anonymousAllowedPaths) {
            if (path.endsWith("/*")) {
                // 패턴 매칭을 위해 api/v1/* 이면 api/v1 으로 변환 후 이를 startwith 로 비교한다
                String basePath = path.substring(0, path.length() - 2);
                if (requestURI.startsWith(basePath)) {
                    return true;
                }
            } else if (requestURI.equals(path)) {
                return true;
            }
        }
        return false;
    }

    private boolean isAnonymousToken(String token) {
        return tokenManager.isAnonymousToken(token);
    }
}
