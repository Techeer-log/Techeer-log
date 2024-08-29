package com.techeerlog.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EditMemberRequest {
    private String nickname;
    private String introduction;
}
