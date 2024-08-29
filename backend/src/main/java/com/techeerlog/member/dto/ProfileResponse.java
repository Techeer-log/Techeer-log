package com.techeerlog.member.dto;

import com.techeerlog.member.domain.Member;
import lombok.Getter;

@Getter
public class ProfileResponse {

    private Long id;
    private String loginId;
    private String nickname;
    private String profileImageUrl;
    private String introduction;

    public ProfileResponse() {
    }

    public ProfileResponse(Long id,String loginId, String nickname, String profileImageUrl, String introduction) {
        this.id = id;
        this.loginId = loginId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.introduction = introduction;
    }

    public static ProfileResponse of(Member member) {
        return new ProfileResponse(member.getId(), member.getLoginId(), member.getNickname(), member.getProfileImageUrl(), member.getIntroduction());
    }
}
