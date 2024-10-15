package com.techeerlog.project.dto;

import com.techeerlog.framework.dto.FrameworkResponse;
import com.techeerlog.member.dto.MemberResponse;
import com.techeerlog.project.enums.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private Long id;
    private String mainImageUrl;
    private String title;
    private String subtitle;
    private String content;
    private LocalDate startDate;
    private LocalDate endDate;
    private PlatformEnum platform;
    private ProjectTypeEnum projectTypeEnum;
    private ProjectTeamNameEnum projectTeamNameEnum;
    private int year;
    private SemesterEnum semesterEnum;
    private ProjectStatusEnum projectStatusEnum;
    private String githubLink;
    private String blogLink;
    private String websiteLink;
    private int loveCount = 0;
    private boolean isLoved;
    private boolean isScraped;
    private MemberResponse writer;
    private List<ProjectMemberResponse> projectMemberResponseList;
    private List<NonRegisterProjectMemberResponse> nonRegisterProjectMemberResponseList;
    private List<FrameworkResponse> frameworkResponseList;
}
