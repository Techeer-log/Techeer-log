package com.techeerlog.member.domain;

import com.techeerlog.global.config.BaseEntity;
import com.techeerlog.member.enums.RoleType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@SQLDelete(sql = "UPDATE member SET deleted = TRUE WHERE member_id = ?")
@SQLRestriction("deleted = FALSE")
public class Member extends BaseEntity {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Embedded
    @Column(name = "login_id")
    private LoginId loginId;

    @Embedded
    private Password password;

    @Embedded
    private Nickname nickname;

    @Getter
    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Getter
    @Column(name = "introduction")
    private String introduction = "";

    @Getter
    @Enumerated(EnumType.STRING)
    private RoleType roleType = RoleType.USER;

    public String getLoginId() {
        return loginId.getValue();
    }

    public String getNickname() {
        return nickname.getValue();
    }

    public String getPassword() {
        return password.getValue();
    }

    public Member() {
    }


    @Builder
    public Member(Long id, LoginId loginId, Password password, Nickname nickname, String profileImageUrl, String introduction) {
        this.id = id;
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.introduction = introduction != null ? introduction : "";
    }

    public void updateNickname(Nickname nickname) {
        this.nickname = nickname;
    }

    public void updateProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void updatePassword(Password password) {
        this.password = password;
    }

    public void updateIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public boolean hasId(Long id) {
        return this.id.equals(id);
    }
}



