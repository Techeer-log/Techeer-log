package consolelog.auth.service;

import consolelog.auth.domain.RefreshToken;
import consolelog.auth.repository.RefreshTokenRepository;
import consolelog.support.token.InvalidRefreshTokenException;
import consolelog.support.token.TokenManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenManager tokenManager;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, TokenManager tokenManager) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.tokenManager = tokenManager;
    }

    @Transactional
    public void saveToken(String token, Long memberId) {
        deleteToken(memberId);
        RefreshToken refreshToken = new RefreshToken(memberId, token);
        refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public void matches(String refreshToken, Long memberId) {
        RefreshToken savedToken = refreshTokenRepository.findMemberById(memberId)
                .orElseThrow(InvalidRefreshTokenException::new);

        // db에 저장된 refreshToken 이 유효기간이 지났지 않은지 체크
        if (!tokenManager.isValid(savedToken.getToken())) {
            refreshTokenRepository.delete(savedToken);
            throw new InvalidRefreshTokenException();
        }
        savedToken.validateSameToken(refreshToken);
    }

    private void deleteToken(Long memberId) {
        refreshTokenRepository.deleteAllByMemberId(memberId);
    }

}
