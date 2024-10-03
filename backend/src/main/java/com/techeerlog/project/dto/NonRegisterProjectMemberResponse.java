package com.techeerlog.project.dto;

import com.techeerlog.project.enums.ProjectMemberTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NonRegisterProjectMemberResponse {
    private String name;
    private ProjectMemberTypeEnum projectMemberTypeEnum;
}
