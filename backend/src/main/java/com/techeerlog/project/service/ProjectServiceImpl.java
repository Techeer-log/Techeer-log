package com.techeerlog.project.service;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.auth.exception.AuthorizationException;
import com.techeerlog.framework.domain.Framework;
import com.techeerlog.framework.dto.request.FrameworkRequest;
import com.techeerlog.framework.dto.response.FrameworkResponse;
import com.techeerlog.framework.exception.FrameworkNotFoundException;
import com.techeerlog.framework.repository.FrameworkRepository;
import com.techeerlog.global.mapper.FrameworkMapper;
import com.techeerlog.global.mapper.MemberMapper;
import com.techeerlog.global.mapper.ProjectMapper;
import com.techeerlog.global.support.UtilMethod;
import com.techeerlog.love.repository.LoveRepository;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.dto.MemberResponse;
import com.techeerlog.member.enums.RoleType;
import com.techeerlog.member.exception.MemberNotFoundException;
import com.techeerlog.member.repository.MemberRepository;
import com.techeerlog.project.domain.NonRegisterProjectMember;
import com.techeerlog.project.domain.Project;
import com.techeerlog.project.domain.ProjectFramework;
import com.techeerlog.project.domain.ProjectMember;
import com.techeerlog.project.dto.request.NonRegisterProjectMemberRequest;
import com.techeerlog.project.dto.response.NonRegisterProjectMemberResponse;
import com.techeerlog.project.dto.request.PrizeProjectListRequest;
import com.techeerlog.project.dto.response.ProjectItemListResponse;
import com.techeerlog.project.dto.response.ProjectItemResponse;
import com.techeerlog.project.dto.request.ProjectListRequest;
import com.techeerlog.project.dto.request.ProjectMemberRequest;
import com.techeerlog.project.dto.response.ProjectMemberResponse;
import com.techeerlog.project.dto.request.ProjectRequest;
import com.techeerlog.project.dto.response.ProjectResponse;
import com.techeerlog.project.enums.RankEnum;
import com.techeerlog.project.enums.SearchFieldEnum;
import com.techeerlog.project.enums.SemesterEnum;
import com.techeerlog.project.exception.PageableAccessException;
import com.techeerlog.project.exception.ProjectNotFoundException;
import com.techeerlog.project.repository.NonRegisterProjectMemberRepository;
import com.techeerlog.project.repository.ProjectFrameworkRepository;
import com.techeerlog.project.repository.ProjectMemberRepository;
import com.techeerlog.project.repository.ProjectRepository;
import com.techeerlog.scrap.repository.ScrapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final UtilMethod utilMethod;
    private final ProjectMapper projectMapper;
    private final MemberMapper memberMapper;
    private final FrameworkMapper frameworkMapper;
    private final ProjectMemberRepository projectMemberRepository;
    private final MemberRepository memberRepository;
    private final FrameworkRepository frameworkRepository;
    private final ProjectFrameworkRepository projectFrameworkRepository;
    private final NonRegisterProjectMemberRepository nonRegisterProjectMemberRepository;
    private final LoveRepository loveRepository;
    private final ScrapRepository scrapRepository;

    @Cacheable(cacheNames = "project", keyGenerator = "customKeyGenerator")
    public ProjectResponse findProjectResponse(Long projectId, AuthInfo authInfo) {

        Project findProject = findProjectById(projectId);

        return createProjectResponse(findProject, authInfo);
    }

    @Transactional
    public Long addProject(ProjectRequest projectRequest, AuthInfo authInfo) {
        validateMemberList(projectRequest);

        Project project = projectMapper.projectRequestToProject(projectRequest);
        project.updateMember(utilMethod.findMemberByAuthInfo(authInfo));

        Optional<Project> projectOptional = Optional.of(projectRepository.save(project));
        Project savedProject = projectOptional.orElseThrow(ProjectNotFoundException::new);

        saveProjectDataLists(savedProject, projectRequest);

        return savedProject.getId();
    }

    @Transactional
    @CachePut(cacheNames = "project", keyGenerator = "customKeyGenerator")
    public ProjectResponse updateProject(Long id, ProjectRequest projectRequest, AuthInfo authInfo) {
        Project project = findProjectById(id);
        validateOwner(authInfo, project);

        // 기존 project 대한 연관 관계 제거
        deleteAllProjectMember(project);
        deleteAllNonRegisterProjectMember(project);
        deleteAllProjectFramework(project);

        // dirty checking을 통한 업데이트 -> @Setter 제거 불가
        projectMapper.updateProjectFromRequest(projectRequest, project);

        // 새로운 연관 관계 설정
        saveProjectDataLists(project, projectRequest);

        return createProjectResponse(project, authInfo);
    }

    @Transactional
    @CacheEvict(cacheNames = "project", keyGenerator = "customKeyGenerator")
    public void deleteProject(Long id, AuthInfo authInfo) {
        Project project = findProjectById(id);
        validateOwner(authInfo, project);
        projectRepository.delete(project);
    }

    public ProjectItemListResponse findProjectListResponse(ProjectListRequest projectListRequest, AuthInfo authInfo) {
        Slice<Project> projectSlice = getProjectSlice(projectListRequest);

        return projectListToProjectItemListResponse(projectSlice, authInfo);
    }

    public ProjectItemListResponse findPrizeProjectListResponse(PrizeProjectListRequest prizeProjectListRequest,
                                                                AuthInfo authInfo) {
        Slice<Project> projectSlice =
                projectRepository.findPrizeProjectList(prizeProjectListRequest.getProjectTypeEnum(),
                        prizeProjectListRequest.getYear(), prizeProjectListRequest.getSemesterEnum(),
                        List.of(RankEnum.FIRST, RankEnum.SECOND, RankEnum.THIRD, RankEnum.FOURTH, RankEnum.FIFTH));

        return projectListToProjectItemListResponse(projectSlice, authInfo);
    }

    public ProjectItemListResponse findSortedProjectListResponse(ProjectListRequest projectListRequest,
                                                                 AuthInfo authInfo) {
        int year = 2024;
        SemesterEnum semester = SemesterEnum.SECOND;
        Slice<Project> sortedProjectSlice = getSortedProjectSlice(projectListRequest, year, semester);
        return projectListToProjectItemListResponse(sortedProjectSlice, authInfo);
    }

    private List<NonRegisterProjectMemberResponse> getNonRegisterProjectMemberResponseList(
            List<NonRegisterProjectMember> nonRegisterProjectMemberList) {
        return nonRegisterProjectMemberList.stream()
                .map(NonRegisterProjectMember::getResponse)
                .collect(Collectors.toList());
    }

    private void saveProjectNonRegisterProjectMemberList(Project project,
                                                         List<NonRegisterProjectMemberRequest> nonRegisterProjectMemberRequestList) {
        List<NonRegisterProjectMember> nonRegisterProjectMemberList = nonRegisterProjectMemberRequestList.stream()
                .map(nonRegisterProjectMemberRequest -> new NonRegisterProjectMember(project,
                        nonRegisterProjectMemberRequest))
                .collect(Collectors.toList());

        nonRegisterProjectMemberRepository.saveAll(nonRegisterProjectMemberList);
    }

    private ProjectItemListResponse projectListToProjectItemListResponse(Slice<Project> projectSlice,
                                                                         AuthInfo authInfo) {

        List<ProjectItemResponse> projectItemResponseList = projectSlice.stream()
                .map(project -> {
                    MemberResponse writer = memberMapper.memberToMemberResponse(project.getMember());
                    int loveCount = project.getLoveList().size();
                    boolean isLoved =
                            loveRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent();
                    boolean isScraped =
                            scrapRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent();
                    List<FrameworkResponse> frameworkResponseList =
                            getFrameworkResponseList(project.getProjectFrameworkList());

                    return projectMapper.projectToProjectItemResponse(project, writer, loveCount, isLoved, isScraped,
                            frameworkResponseList);
                })
                .collect(Collectors.toList());

        return ProjectItemListResponse.builder()
                .nextPage(projectSlice.getNumber() + 1)
                .hasNextPage(projectSlice.hasNext())
                .projectItemResponseList(projectItemResponseList)
                .build();
    }

    private Slice<Project> getProjectSlice(ProjectListRequest projectListRequest) {
        Slice<Project> projectSlice = null;

        int pageStart = projectListRequest.getPageStart();
        int pageSize = projectListRequest.getPageSize();
        SearchFieldEnum searchFieldEnum = projectListRequest.getSearchFieldEnum();
        Sort.Direction sortDirection = projectListRequest.getSortDirection();
        String searchKeyword = projectListRequest.getSearchKeyword();

        Sort sort = Sort.by(new Sort.Order(sortDirection, "id"));

        Pageable pageable = PageRequest.of(pageStart, pageSize, sort);

        switch (searchFieldEnum) {
            case TITLE -> projectSlice = projectRepository.findAllByTitleContaining(searchKeyword, pageable);
            case CONTENT -> projectSlice = projectRepository.findAllByContentContaining(searchKeyword, pageable);
            case WRITER -> projectSlice = projectRepository.findAllByMemberId(Long.parseLong(searchKeyword), pageable);
            case ALL -> projectSlice = projectRepository.findAllByTitleOrContentContaining(searchKeyword, pageable);
        }

        if (projectSlice == null) {
            throw new PageableAccessException();
        }

        return projectSlice;
    }

    private void deleteAllProjectFramework(Project project) {
        projectFrameworkRepository.deleteAllByProjectId(project.getId());
    }

    private void deleteAllNonRegisterProjectMember(Project project) {
        nonRegisterProjectMemberRepository.deleteAllByProjectId(project.getId());
    }

    private void deleteAllProjectMember(Project project) {
        projectMemberRepository.deleteAllByProjectId(project.getId());
    }

    private void saveProjectFrameworkList(Project project, List<FrameworkRequest> frameworkRequestList) {
        List<ProjectFramework> projectFrameworkList = frameworkRequestList.stream()
                .map(frameworkRequest -> {
                    Optional<Framework> framework = frameworkRepository.findByNameAndFrameworkTypeEnum(
                            frameworkRequest.getName().toLowerCase(),
                            frameworkRequest.getFrameworkTypeEnum());

                    // DB에 없는 새로운 값인 경우 객체를 생성하고 저장
                    if (framework.isEmpty()) {
                        Framework newFramework = Framework.builder()
                                .name(frameworkRequest.getName().toLowerCase())
                                .frameworkTypeEnum(frameworkRequest.getFrameworkTypeEnum())
                                .build();

                        framework = Optional.of(frameworkRepository.save(newFramework));
                    }

                    return ProjectFramework.builder()
                            .project(project)
                            .framework(framework.orElseThrow(FrameworkNotFoundException::new))
                            .build();
                })
                .collect(Collectors.toList());

        projectFrameworkRepository.saveAll(projectFrameworkList);
    }

    private void saveProjectMemberList(Project project, List<ProjectMemberRequest> projectMemberRequestList) {
        List<ProjectMember> projectMemberList = getProjectMemberListByRequest(project, projectMemberRequestList);
        projectMemberRepository.saveAll(projectMemberList);
    }

    private List<ProjectMember> getProjectMemberListByRequest(Project project,
                                                              List<ProjectMemberRequest> projectMemberRequestList) {
        return projectMemberRequestList.stream()
                .map(projectMemberRequest -> {
                    Optional<Member> member = memberRepository.findById(projectMemberRequest.getMemberId());
                    return ProjectMember.builder()
                            .project(project)
                            .member(member.orElseThrow(MemberNotFoundException::new))
                            .projectMemberType(projectMemberRequest.getProjectMemberTypeEnum())
                            .build();
                })
                .collect(Collectors.toList());
    }

    private void validateMemberList(ProjectRequest projectRequest) {
        projectRequest.getProjectMemberRequestList().stream()
                .map(ProjectMemberRequest::getMemberId)
                .forEach(utilMethod::validateMemberId);
    }

    private List<FrameworkResponse> getFrameworkResponseList(List<ProjectFramework> projectFrameworkList) {
        return projectFrameworkList.stream()
                .map(projectFramework -> frameworkMapper.frameworkToFrameworkResponse(projectFramework.getFramework()))
                .collect(Collectors.toList());
    }

    private List<ProjectMemberResponse> getProjectMemberResponseList(List<ProjectMember> projectMemberList) {
        return projectMemberList.stream()
                .map(projectMember -> ProjectMemberResponse.builder()
                        .projectMemberTypeEnum(projectMember.getProjectMemberType())
                        .memberResponse(memberMapper.memberToMemberResponse(projectMember.getMember()))
                        .build())
                .collect(Collectors.toList());
    }

    private Project findProjectById(Long projectId) {
        return projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
    }

    private void validateOwner(AuthInfo authInfo, Project project) {
        if (authInfo.hasRole(RoleType.ADMIN.getName())) return;

        if (!project.isOwner(authInfo.getId())) {
            throw new AuthorizationException();
        }
    }

    private Slice<Project> getSortedProjectSlice(ProjectListRequest projectListRequest, int year,
                                                 SemesterEnum semester) {
        Sort sort = Sort.by(Sort.Direction.ASC, "projectTeamNameEnum", "id");
        Pageable pageable = PageRequest.of(projectListRequest.getPageStart(), projectListRequest.getPageSize(), sort);
        return projectRepository.findAllByYearAndSemesterSorted(year, semester, pageable);
    }

    private ProjectResponse createProjectResponse(Project project, AuthInfo authInfo) {
        MemberResponse writer = memberMapper.memberToMemberResponse(project.getMember());
        int loveCount = project.getLoveList().size();
        boolean isLoved = loveRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent();
        boolean isScraped = scrapRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent();
        List<ProjectMemberResponse> projectMemberResponseList =
                getProjectMemberResponseList(project.getProjectMemberList());
        List<NonRegisterProjectMemberResponse> nonRegisterProjectMemberResponseList =
                getNonRegisterProjectMemberResponseList(project.getNonRegisterProjectMemberList());
        List<FrameworkResponse> frameworkResponseList = getFrameworkResponseList(project.getProjectFrameworkList());

        return projectMapper.projectToProjectResponse(project, writer, loveCount, isLoved, isScraped,
                projectMemberResponseList, nonRegisterProjectMemberResponseList, frameworkResponseList);
    }

    public void saveProjectDataLists(Project project, ProjectRequest projectRequest) {
        saveProjectMemberList(project, projectRequest.getProjectMemberRequestList());
        saveProjectNonRegisterProjectMemberList(project, projectRequest.getNonRegisterProjectMemberRequestList());
        saveProjectFrameworkList(project, projectRequest.getFrameworkRequestList());
    }

}



