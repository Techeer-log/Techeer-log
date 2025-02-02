package com.techeerlog.auth.service;

import com.techeerlog.auth.domain.encryptor.EncryptorI;
import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.auth.dto.LoginRequest;
import com.techeerlog.auth.exception.LoginFailedException;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service

public class AuthService {

    private final MemberRepository memberRepository;
    private final EncryptorI oldEncryptor;
    private final EncryptorI newEncryptor;

    public AuthService(MemberRepository memberRepository, @Qualifier("getOldEncryptor") EncryptorI oldEncryptor, @Qualifier("getNewEncryptor") EncryptorI newEncryptor) {
        this.memberRepository = memberRepository;
        this.oldEncryptor = oldEncryptor;
        this.newEncryptor = newEncryptor;
    }

    public AuthInfo login(LoginRequest loginRequest) {
        Member member = memberRepository.findByLoginIdValue(loginRequest.getLoginId())
                .orElseThrow(LoginFailedException::new);

        EncryptorI chosenEncryptor = member.isSaltNew() ? newEncryptor : oldEncryptor;
        String hashedPassword = chosenEncryptor.encrypt(loginRequest.getPassword());
        if (!hashedPassword.equals(member.getPassword())) {
            throw new LoginFailedException();
        }

        return new AuthInfo(member.getId(), member.getRoleType().getName(), member.getNickname());
    }
}