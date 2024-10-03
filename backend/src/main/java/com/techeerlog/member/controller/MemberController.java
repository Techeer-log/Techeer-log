package com.techeerlog.member.controller;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.auth.service.RefreshTokenService;
import com.techeerlog.global.mapper.MemberMapper;
import com.techeerlog.global.response.ResultResponse;
import com.techeerlog.global.response.SimpleResultResponse;
import com.techeerlog.global.support.token.Login;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.dto.EditMemberRequest;
import com.techeerlog.member.dto.MemberResponse;
import com.techeerlog.member.dto.ProfileResponse;
import com.techeerlog.member.dto.SignupRequest;
import com.techeerlog.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static com.techeerlog.global.response.ResultCode.*;


@Tag(name = "Member", description = "Member API Document")
@RestController
@RequestMapping("/v1/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final RefreshTokenService refreshTokenService;


    public MemberController(MemberService memberService, RefreshTokenService refreshTokenService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.refreshTokenService = refreshTokenService;
        this.memberMapper = memberMapper;
    }

    @Operation(summary = "회원가입", description = "회원가입 기능")
    @PostMapping(value = "/signup")
    public ResponseEntity<ResultResponse<MemberResponse>> signUp(@RequestBody SignupRequest signupRequest) {
        Member member = memberService.signUp(signupRequest);
        ResultResponse<MemberResponse> resultResponse = new ResultResponse<>(SIGNUP_SUCCESS, memberMapper.memberToMemberResponse(member));

        return ResponseEntity.status(SIGNUP_SUCCESS.getStatus())
                .body(resultResponse);
    }

//    @GetMapping(value = "/signup/exists", params = "loginId")
//    public ResponseEntity<UniqueResponse> validateUniqueLoginId(@RequestParam String loginId) {
//        UniqueResponse uniqueResponse = memberService.checkUniqueLoginId(loginId);
//        return ResponseEntity.ok(uniqueResponse);
//    }
//
//    @GetMapping(value = "/signup/exists", params = "nickname")
//    public ResponseEntity<UniqueResponse> validateUniqueNickname(@RequestParam String nickname) {
//        UniqueResponse uniqueResponse = memberService.checkUniqueNickname(nickname);
//        return ResponseEntity.ok(uniqueResponse);
//    }

    @Operation(summary = "프로필 조회", description = "프로필 조회 기능")
    @GetMapping("/profile")
    public ResponseEntity<ResultResponse<ProfileResponse>> findProfile(@Login AuthInfo authInfo) {
        ProfileResponse profileResponse = memberService.findProfile(authInfo);
        ResultResponse<ProfileResponse> resultResponse = new ResultResponse<>(FIND_PROFILE_SUCCESS, profileResponse);

        return ResponseEntity.status(FIND_PROFILE_SUCCESS.getStatus())
                .body(resultResponse);
    }


    @Operation(summary = "프로필 수정", description = "프로필 수정 기능")
    @PatchMapping(consumes = "multipart/form-data")
    public ResponseEntity<SimpleResultResponse> editMember(@RequestPart(value = "data", required = false) EditMemberRequest editMemberRequest,
                                                           @RequestPart(value = "part", required = false) Optional<MultipartFile> multipartFile,
                                                           @Login AuthInfo authInfo) {

        memberService.edit(editMemberRequest, authInfo, multipartFile);
        refreshTokenService.deleteToken(authInfo.getId());

        SimpleResultResponse resultResponse = new SimpleResultResponse(EDIT_PROFILE_SUCCESS);

        return ResponseEntity.status(EDIT_PROFILE_SUCCESS.getStatus())
                .body(resultResponse);
    }
}
