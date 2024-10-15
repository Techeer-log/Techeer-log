package com.techeerlog.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.techeerlog.framework.dto.FrameworkRequest;
import com.techeerlog.project.enums.PlatformEnum;
import com.techeerlog.project.enums.ProjectStatusEnum;
import com.techeerlog.project.enums.ProjectTypeEnum;
import com.techeerlog.project.enums.SemesterEnum;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    private String title;
    private String subtitle;
    private String content;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate endDate;
    private PlatformEnum platform;
    private ProjectTypeEnum projectTypeEnum;
    private int year;
    private SemesterEnum semesterEnum;
    private ProjectStatusEnum projectStatusEnum;
    private String githubLink;
    private String blogLink;
    private String websiteLink;
    private String mainImageUrl;
    private List<ProjectMemberRequest> projectMemberRequestList;
    private List<NonRegisterProjectMemberRequest> nonRegisterProjectMemberRequestList;
    private List<FrameworkRequest> frameworkRequestList;
}
