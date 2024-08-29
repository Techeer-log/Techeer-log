package com.techeerlog.scrap.dto;

import com.techeerlog.framework.dto.FrameworkResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ScrapProjectItemResponse {
    private Long projectId;
    private String mainImageUrl;
    private String title;
    private String subtitle;
    private boolean isScrapped;
    private boolean isServiceRunning;
    private List<FrameworkResponse> frameworkResponseList;
}
