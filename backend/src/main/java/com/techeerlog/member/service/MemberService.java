package com.techeerlog.member.service;

import com.techeerlog.auth.domain.encryptor.EncryptorI;
import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.global.config.BaseEntity;
import com.techeerlog.image.service.AmazonS3Service;
import com.techeerlog.member.domain.LoginId;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.domain.Nickname;
import com.techeerlog.member.domain.Password;
import com.techeerlog.member.dto.*;
import com.techeerlog.member.enums.RoleType;
import com.techeerlog.member.exception.*;
import com.techeerlog.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Transactional
public class MemberService extends BaseEntity {

    private final MemberRepository memberRepository;
    private final EncryptorI encryptor;
    private final AmazonS3Service amazonS3Service;

    public MemberService(MemberRepository memberRepository, EncryptorI encryptor, AmazonS3Service amazonS3Service) {
        this.memberRepository = memberRepository;
        this.encryptor = encryptor;
        this.amazonS3Service = amazonS3Service;
    }

    @Transactional
    public Member signUp(SignupRequest signupRequest) {
        validate(signupRequest);
        String defaultProfileImageUrl = "https://techeer-bucket.s3.ap-northeast-2.amazonaws.com/image+(3).png";

        Member member = Member.builder()
                .loginId(new LoginId(signupRequest.getLoginId()))
                .password(Password.of(encryptor, signupRequest.getPassword()))
                .profileImageUrl(defaultProfileImageUrl)
                .nickname(new Nickname(signupRequest.getNickname()))
                .build();
        memberRepository.save(member);
        return member;
    }

    public UniqueResponse checkUniqueLoginId(String loginId) {
        boolean unique = !memberRepository.existsMemberByLoginIdValue(loginId);
        return new UniqueResponse(unique);
    }

    public UniqueResponse checkUniqueNickname(String nickname) {
        boolean unique = !memberRepository.existsMemberByNicknameValue(nickname);
        return new UniqueResponse(unique);
    }

    private void validate(SignupRequest signupRequest) {
        confirmPassword(signupRequest.getPassword(), signupRequest.getPasswordConfirmation());
        validateUniqueNickname(signupRequest);
        validateUniqueLoginId(signupRequest);
    }

    private void validateUniqueLoginId(SignupRequest signupRequest) {
        boolean isDuplicatedLoginId = memberRepository
                .existsMemberByLoginIdValue(signupRequest.getLoginId());
        if (isDuplicatedLoginId) {
            throw new InvalidLoginIdException();
        }
    }

    // else throw 넣어야 함
    private void validateUniqueNickname(SignupRequest signupRequest) {
        boolean isDuplicatedNickname = memberRepository
                .existsMemberByNicknameValue(signupRequest.getNickname());
        if (isDuplicatedNickname) {
            throw new DuplicateNicknameException();
        }
    }

    private void confirmPassword(String password, String passwordConfirmation) {
        if (!password.equals(passwordConfirmation)) {
            throw new PasswordConfirmationException();
        }
    }

    @Transactional
    public void edit(EditMemberRequest editMemberRequest, AuthInfo authInfo, Optional<MultipartFile> multipartFile) {
        Member member = memberRepository.findById(authInfo.getId())
                .orElseThrow(MemberNotFoundException::new);

        multipartFile.ifPresent(file -> {
            if (!file.isEmpty()) {
                String profileImageUrl = amazonS3Service.upload(member.getNickname(), file);
                member.updateProfileImageUrl(profileImageUrl);
            }

        });

        if (editMemberRequest == null) {
            return;
        }

        // 닉네임 수정
        if (!editMemberRequest.getNickname().isEmpty() && !editMemberRequest.getNickname().equals(member.getNickname())) {
            Nickname validNickname = new Nickname(editMemberRequest.getNickname());
            validateUniqueNickname(validNickname);
            member.updateNickname(validNickname);
        }

        // 한 줄 소개 수정
        if (editMemberRequest.getIntroduction() != null
                && !editMemberRequest.getIntroduction().equals(member.getIntroduction())) {
            member.updateIntroduction(editMemberRequest.getIntroduction());
        }

    }

    private void validateUniqueNickname(Nickname validNickname) {
        if (memberRepository.existsMemberByNickname(validNickname)) {
            throw new DuplicateNicknameException();
        }
    }

    public ProfileResponse findProfile(AuthInfo authInfo) {
        Member member = memberRepository.findById(authInfo.getId())
                .orElseThrow(MemberNotFoundException::new);
        return ProfileResponse.of(member);
    }

    @Transactional
    public void updatePassword(AuthInfo authInfo, UpdatePasswordRequest updatePasswordRequest) {
        // 기존 비밀번호를 찾기
        Member member = memberRepository.findById(authInfo.getId())
                .orElseThrow(MemberNotFoundException::new);
        String password = member.getPassword();

        // 기존 비밀번호와 요청으로 입력된 비밀번호가 일치한지 확인
        String currentPassword = updatePasswordRequest.getCurrentPassword();
        if(!password.equals(encryptor.encrypt(currentPassword))){
            throw new IncorrectPasswordException();
        }

        // 일치하다면 새로운 비밀번호가 유효한지 확인
        String newPassword = updatePasswordRequest.getNewPassword();
//        Password.validate(newPassword);

        // 비밀번호 업데이트
        member.updatePassword(Password.of(encryptor, newPassword));
        memberRepository.save(member);

    }

    @Transactional
    public Member createAdmin(SignupRequest signupRequest) {
        validate(signupRequest);
        String defaultProfileImageUrl = "https://techeer-bucket.s3.ap-northeast-2.amazonaws.com/image+(3).png";

        Member member = Member.builder()
                .loginId(new LoginId(signupRequest.getLoginId()))
                .password(Password.of(encryptor, signupRequest.getPassword()))
                .profileImageUrl(defaultProfileImageUrl)
                .nickname(new Nickname(signupRequest.getNickname()))
                .build();
        member.updateRoleType(RoleType.ADMIN);

        memberRepository.save(member);
        return member;
    }

}
