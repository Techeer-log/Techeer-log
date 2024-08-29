package com.techeerlog.auth.service;

//import com.techeerlog.auth.domain.RefreshToken;
import com.techeerlog.auth.repository.RefreshTokenRepository;
import com.techeerlog.global.exception.InvalidRefreshTokenException;
import com.techeerlog.global.support.token.TokenManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@Transactional(readOnly = true)
public class RefreshTokenService {
//    private final RefreshTokenRepository refreshTokenRepository;
//    private final TokenManager tokenManager;

    private final RedisTemplate<String, String> redisTemplate;
    private final long refreshTokenValidityMilliseconds;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository,
                               TokenManager tokenManager,
                               RedisTemplate<String, String> redisTemplate,
                               @Value("${security.jwt.token.expire-length.refresh}") long refreshTokenValidityMilliseconds) {
//        this.refreshTokenRepository = refreshTokenRepository;
//        this.tokenManager = tokenManager;
        this.redisTemplate = redisTemplate;
        this.refreshTokenValidityMilliseconds = refreshTokenValidityMilliseconds;
    }

    @Transactional
    public void saveToken(String token, Long memberId) {
        // 수
//        Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findRefreshTokenByMemberId(memberId);
//        if (optionalRefreshToken.isPresent()) {
//            RefreshToken existingToken = optionalRefreshToken.get();
//            existingToken.setToken(token);
//            refreshTokenRepository.save(existingToken);
//        } else {
//            RefreshToken newRefreshToken = new RefreshToken(memberId, token);
//            refreshTokenRepository.save(newRefreshToken);
//        }
        // Redis에 저장 - 만료 시간 설정을 통해 자동 삭제 처리
        redisTemplate.opsForValue().set(
                memberId.toString(),
                token,
                refreshTokenValidityMilliseconds,
                TimeUnit.MILLISECONDS
        );

//        System.out.println("refresh token 저장");
    }

    @Transactional
    public void matches(String refreshToken, Long memberId) {
//        RefreshToken savedToken = refreshTokenRepository.findRefreshTokenByMemberId(memberId)
//                .orElseThrow(InvalidRefreshTokenException::new);
//
//        // db에 저장된 refreshToken 이 유효기간이 지/oken())) {
//            refreshTokenRepository.delete(savedToken);
//            throw new InvalidRefreshTokenException();
//        }
//        savedToken.validateSameToken(refreshToken);
        String savedToken = redisTemplate.opsForValue().get(memberId.toString());

        if (savedToken == null || !savedToken.equals(refreshToken)) {
            throw new InvalidRefreshTokenException();
        }
    }

    @Transactional
    public void deleteToken(Long memberId) {
//        refreshTokenRepository.deleteAllByMemberId(memberId);
        redisTemplate.delete(memberId.toString());
//        System.out.println("refresh token 삭제");
    }
}
