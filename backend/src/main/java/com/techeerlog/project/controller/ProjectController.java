package com.techeerlog.project.controller;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.global.response.ResultResponse;
import com.techeerlog.global.support.token.Login;
import com.techeerlog.project.dto.*;
import com.techeerlog.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import static com.techeerlog.global.response.ResultCode.*;


@Tag(name = "Project", description = "Project API Document")
@RestController
@RequestMapping("/v1")
@Log4j2
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Operation(summary = "프로젝트 조회", description = "프로젝트 조회")
    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ResultResponse<ProjectResponse>> findProject(@PathVariable("projectId") Long projectId, @Login AuthInfo authInfo) {
        ProjectResponse findProjectResponse = projectService.findProjectResponse(projectId, authInfo);
        ResultResponse<ProjectResponse> resultResponse = new ResultResponse<>(FIND_PROJECT_SUCCESS, findProjectResponse);

        return ResponseEntity.status(FIND_PROJECT_SUCCESS.getStatus())
                .body(resultResponse);
    }

    @Operation(summary = "프로젝트 생성", description = "날짜 입력은 2000.10.04 의 형태로 변형해서 입력 해주어야 한다!!  ")
    @PostMapping("/projects")
    public ResponseEntity<ResultResponse<URI>> addPost(@Valid @RequestBody ProjectRequest projectRequest,
                                                       @Login AuthInfo authInfo) {
        Long postId = projectService.addProject(projectRequest, authInfo);
        URI location = URI.create("/posts/" + postId);
        ResultResponse<URI> resultResponse = new ResultResponse<>(ADD_PROJECT_SUCCESS, location);

        return ResponseEntity.status(ADD_PROJECT_SUCCESS.getStatus()).body(resultResponse);
    }

    @Operation(summary = "프로젝트 수정", description = "프로젝트 수정")
    @PutMapping("/projects/{projectId}")
    public ResponseEntity<ResultResponse<ProjectResponse>> updatePost(@PathVariable("projectId") Long projectId,
                                                                      @RequestBody ProjectRequest projectRequest,
                                                                      @Login AuthInfo authInfo) {
//        projectService.updateProject(projectId, projectRequest, authInfo);
//        ProjectResponse projectResponse = projectService.findProjectResponse(projectId, authInfo);
        ProjectResponse projectResponse = projectService.updateProject(projectId, projectRequest, authInfo);
        ResultResponse<ProjectResponse> resultResponse = new ResultResponse<>(UPDATE_PROJECT_SUCCESS, projectResponse);

        return ResponseEntity.status(UPDATE_PROJECT_SUCCESS.getStatus()).body(resultResponse);
    }

    @Operation(summary = "프로젝트 삭제", description = "프로젝트 삭제")
    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<ResultResponse<String>> deletePost(@PathVariable("projectId") Long projectId, @Login AuthInfo authInfo) {
        projectService.deleteProject(projectId, authInfo);
        ResultResponse<String> resultResponse = new ResultResponse<>(DELETE_SUCCESS);

        return ResponseEntity.status(DELETE_SUCCESS.getStatus()).body(resultResponse);
    }

    @Operation(summary = "프로젝트 리스트 조회", description = "프로젝트 리스트 조회")
    @GetMapping(path = "/projects/list")
    public ResponseEntity<ResultResponse<ProjectItemListResponse>> findProjectList(@Valid ProjectListRequest projectListRequest, @Login AuthInfo authInfo) {
        ProjectItemListResponse projectItemListResponse = projectService.findProjectListResponse(projectListRequest, authInfo);
        projectItemListResponse.getProjectItemResponseList().forEach(project -> {
            log.info("Project ID: {}", project.getId());
            log.info("Title: {}", project.getTitle());
            log.info("Subtitle: {}", project.getSubtitle());
            log.info("Content: {}", project.getContent());
            log.info("Platform: {}", project.getPlatform());
            log.info("StartDate: {}", project.getStartDate());
            log.info("EndDate: {}", project.getEndDate());
            log.info("GithubLink: {}", project.getGithubLink());
            log.info("BlogLink: {}", project.getBlogLink());
            log.info("WebsiteLink: {}", project.getWebsiteLink());
            log.info("Writer ID: {}", project.getWriter().getId());
            log.info("Writer Nickname: {}", project.getWriter().getNickname());
            log.info("Loved: {}", project.isLoved());
            log.info("Scraped: {}", project.isScraped());
            // 필요에 따라 추가 필드들도 로깅 가능
        });
        ResultResponse<ProjectItemListResponse> listResultResponse
                = new ResultResponse<>(FIND_PROJECT_LIST_SUCCESS, projectItemListResponse);

        return ResponseEntity.status(FIND_PROJECT_LIST_SUCCESS.getStatus()).body(listResultResponse);
    }

    @Operation(summary = "우수작 프로젝트 리스트 조회", description = "우수작 프로젝트 리스트 조회")
    @GetMapping(path = "/projects/prize")
    public ResponseEntity<ResultResponse<ProjectItemListResponse>> findPrizeProjectList(@Valid PrizeProjectListRequest prizeProjectListRequest, @Login AuthInfo authInfo) {
        ProjectItemListResponse prizeProjectItemListResponse = projectService.findPrizeProjectListResponse(prizeProjectListRequest, authInfo);

        ResultResponse<ProjectItemListResponse> listResultResponse
                = new ResultResponse<>(FIND_PROJECT_LIST_SUCCESS, prizeProjectItemListResponse);

        return ResponseEntity.status(FIND_PROJECT_LIST_SUCCESS.getStatus()).body(listResultResponse);
    }


    @Operation(summary = "부트캠프 심사위원용", description = "부트캠프 심사위원")
    @GetMapping("/projects/bootcamp")
    public ResponseEntity<ResultResponse<ProjectItemListResponse>> findSortedProjectList(@Valid ProjectListRequest projectListRequest, @Login AuthInfo authInfo) {
        ProjectItemListResponse sortedProjectListResponse = projectService.findSortedProjectListResponse(projectListRequest, authInfo);

        ResultResponse<ProjectItemListResponse> resultResponse
                = new ResultResponse<>(FIND_PROJECT_TEAM_NAME_LIST_SUCCESS, sortedProjectListResponse);

        return ResponseEntity.status(FIND_PROJECT_TEAM_NAME_LIST_SUCCESS.getStatus()).body(resultResponse);
    }

}