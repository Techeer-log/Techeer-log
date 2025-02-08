package com.techeerlog.auth.service;

import com.techeerlog.auth.domain.encryptor.EncryptorI;
import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.auth.dto.LoginRequest;
import com.techeerlog.auth.exception.AdminLoginRequiredException;
import com.techeerlog.auth.exception.LoginFailedException;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.enums.RoleType;
import com.techeerlog.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final EncryptorI encryptor;

    public AuthService(MemberRepository memberRepository, EncryptorI encryptor) {
        this.memberRepository = memberRepository;
        this.encryptor = encryptor;
    }

    public AuthInfo login(LoginRequest loginRequest) {
        String loginId = loginRequest.getLoginId();
        String password = encryptor.encrypt(loginRequest.getPassword());
        Member member = memberRepository.findByLoginIdValueAndPasswordValue(loginId, password)
                .orElseThrow(LoginFailedException::new);
        return new AuthInfo(member.getId(), member.getRoleType().getName(), member.getNickname());
    }

    public AuthInfo adminLogin(LoginRequest loginRequest) {
        String loginId = loginRequest.getLoginId();
        String password = encryptor.encrypt(loginRequest.getPassword());
        Member member = memberRepository.findByLoginIdValueAndPasswordValue(loginId, password)
                .orElseThrow(LoginFailedException::new);

        if (!member.hasRoleType(RoleType.ADMIN)) {
            throw new AdminLoginRequiredException();
        }

        return new AuthInfo(member.getId(), member.getRoleType().getName(), member.getNickname());
    }
}
