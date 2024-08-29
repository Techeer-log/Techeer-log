package com.techeerlog.project.dto;

import com.techeerlog.framework.dto.FrameworkResponse;
import com.techeerlog.member.dto.MemberResponse;
import com.techeerlog.project.enums.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectItemResponse {
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
    private RankEnum rankEnum;
    private ProjectStatusEnum projectStatusEnum;
    private int loveCount = 0;
    private boolean isLoved;
    private boolean isScraped;
    private MemberResponse writer;
    private List<FrameworkResponse> frameworkResponseList;
}
