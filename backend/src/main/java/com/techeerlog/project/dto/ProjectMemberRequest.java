package com.techeerlog.project.dto;

import com.techeerlog.project.enums.ProjectMemberTypeEnum;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMemberRequest {
    private Long memberId;
    private ProjectMemberTypeEnum projectMemberTypeEnum;
}
