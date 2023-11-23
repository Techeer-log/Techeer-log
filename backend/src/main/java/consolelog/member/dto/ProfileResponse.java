package consolelog.member.dto;

import consolelog.member.domain.Member;
import lombok.Getter;

@Getter
public class ProfileResponse {

    private String nickname;
    private String profileImageUrl;

    public ProfileResponse() {
    }

    public ProfileResponse(String nickname, String profileImageUrl) {
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    public static ProfileResponse of(Member member) {
        return new ProfileResponse(member.getNickname(), member.getProfileImageUrl());
    }
}
