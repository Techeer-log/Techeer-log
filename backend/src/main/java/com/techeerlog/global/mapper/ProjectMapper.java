package com.techeerlog.global.mapper;

import com.techeerlog.project.domain.Project;
import com.techeerlog.project.dto.ProjectItemResponse;
import com.techeerlog.project.dto.ProjectRequest;
import com.techeerlog.project.dto.ProjectResponse;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProjectMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProjectFromRequest(ProjectRequest projectRequest, @MappingTarget Project project);
    Project projectRequestToProject(ProjectRequest projectRequest);
    ProjectRequest projectToProjectRequest(Project project);

    Project projectResponseToProject(ProjectResponse projectResponse);

    @Mapping(source = "content", target = "content")
    ProjectResponse projectToProjectResponse(Project project);

    ProjectItemResponse projectToProjectItemResponse(Project project);
}
