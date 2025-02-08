package com.techeerlog.auth.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class AuthInfo {

    private final Long id;
    private final String type;
    private final String nickname;

    public AuthInfo(Long id, String type, String nickname) {
        this.id = id;
        this.type = type;
        this.nickname = nickname;
    }

    public boolean hasRole(String type) {
        return this.type.equals(type);
    }
}
