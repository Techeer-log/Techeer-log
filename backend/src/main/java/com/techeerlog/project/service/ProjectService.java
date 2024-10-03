package com.techeerlog.project.service;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.auth.exception.AuthorizationException;
import com.techeerlog.framework.domain.Framework;
import com.techeerlog.framework.dto.FrameworkRequest;
import com.techeerlog.framework.dto.FrameworkResponse;
import com.techeerlog.framework.exception.FrameworkNotFoundException;
import com.techeerlog.framework.repository.FrameworkRepository;
import com.techeerlog.global.mapper.FrameworkMapper;
import com.techeerlog.global.mapper.MemberMapper;
import com.techeerlog.global.mapper.ProjectMapper;
import com.techeerlog.global.support.UtilMethod;
import com.techeerlog.love.repository.LoveRepository;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.exception.MemberNotFoundException;
import com.techeerlog.member.repository.MemberRepository;
import com.techeerlog.project.domain.*;
import com.techeerlog.project.dto.*;
import com.techeerlog.project.enums.ProjectTeamNameEnum;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
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

    @Cacheable(value = "project", key = "#projectId")
    public ProjectResponse findProjectResponse(Long projectId, AuthInfo authInfo) {

        Project findProject = findProjectById(projectId);

        return createProjectResponse(findProject, authInfo);
    }

    private List<NonRegisterProjectMemberResponse> getNonRegisterProjectMemberResponseList(List<NonRegisterProjectMember> nonRegisterProjectMemberList) {
        List<NonRegisterProjectMemberResponse> nonRegisterProjectMemberResponseList = new ArrayList<>();

        for (NonRegisterProjectMember nonRegisterProjectMember : nonRegisterProjectMemberList) {
            nonRegisterProjectMemberResponseList.add(nonRegisterProjectMember.getResponse());
        }
        return nonRegisterProjectMemberResponseList;
    }

    @Transactional
    public Long addProject(ProjectRequest projectRequest, AuthInfo authInfo) {
        validateMemberList(projectRequest);

        Member writer = utilMethod.findMemberByAuthInfo(authInfo);
        Project project = projectMapper.projectRequestToProject(projectRequest);
        project.setMember(writer);

        Optional<Project> projectOptional = Optional.of(projectRepository.save(project));
        Project savedProject = projectOptional.orElseThrow(ProjectNotFoundException::new);

        saveProjectMemberList(savedProject, projectRequest.getProjectMemberRequestList());
        saveProjectNonRegisterProjectMemberList(savedProject, projectRequest.getNonRegisterProjectMemberRequestList());
        saveProjectFrameworkList(savedProject, projectRequest.getFrameworkRequestList());

        return savedProject.getId();
    }

    private void saveProjectNonRegisterProjectMemberList(Project project, List<NonRegisterProjectMemberRequest> nonRegisterProjectMemberRequestList) {
        List<NonRegisterProjectMember> nonRegisterProjectMemberList = new ArrayList<>();
        for (NonRegisterProjectMemberRequest nonRegisterProjectMemberRequest : nonRegisterProjectMemberRequestList) {
            nonRegisterProjectMemberList.add(new NonRegisterProjectMember(project, nonRegisterProjectMemberRequest));
        }
        nonRegisterProjectMemberRepository.saveAll(nonRegisterProjectMemberList);
    }

    @Transactional
    @CachePut(value = "project", key = "#id")
    public ProjectResponse updateProject(Long id, ProjectRequest projectRequest, AuthInfo authInfo) {
        Project project = findProjectById(id);
        validateOwner(authInfo, project);

        projectMapper.updateProjectFromRequest(projectRequest, project);
        projectRepository.save(project);

        deleteAllProjectMember(project);
        deleteAllNonRegisterProjectMember(project);
        deleteAllProjectFramework(project);

        saveProjectMemberList(project, projectRequest.getProjectMemberRequestList());
        saveProjectNonRegisterProjectMemberList(project, projectRequest.getNonRegisterProjectMemberRequestList());
        saveProjectFrameworkList(project, projectRequest.getFrameworkRequestList());

        return createProjectResponse(project, authInfo);
    }


    @Transactional
    @CacheEvict(value = "project", key = "#id")
    public void deleteProject(Long id, AuthInfo authInfo) {
        Project project = findProjectById(id);
        validateOwner(authInfo, project);
        projectRepository.delete(project);
    }

    public ProjectItemListResponse findProjectListResponse(ProjectListRequest projectListRequest, AuthInfo authInfo) {
        Slice<Project> projectSlice = getProjectSlice(projectListRequest);

        return projectListToProjectItemListResponse(projectSlice, authInfo);
    }

    public ProjectItemListResponse findPrizeProjectListResponse(PrizeProjectListRequest prizeProjectListRequest, AuthInfo authInfo) {
        Slice<Project> projectSlice = projectRepository.findPrizeProjectList(
                prizeProjectListRequest.getProjectTypeEnum(),
                prizeProjectListRequest.getYear(),
                prizeProjectListRequest.getSemesterEnum(),
                List.of(RankEnum.FIRST, RankEnum.SECOND, RankEnum.THIRD, RankEnum.FOURTH, RankEnum.FIFTH)
        );

        return projectListToProjectItemListResponse(projectSlice, authInfo);
    }

    private ProjectItemListResponse projectListToProjectItemListResponse(Slice<Project> projectSlice, AuthInfo authInfo) {
        List<ProjectItemResponse> projectItemResponseList = new ArrayList<>();

        for (Project project : projectSlice) {
            ProjectItemResponse projectItemResponse = projectMapper.projectToProjectItemResponse(project);
            projectItemResponse.setWriter(memberMapper.memberToMemberResponse(project.getMember()));
            projectItemResponse.setLoveCount(project.getLoveList().size());
            projectItemResponse.setLoved(loveRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent());
            projectItemResponse.setScraped(scrapRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent());
            projectItemResponse.setFrameworkResponseList(getFrameworkResponseList(project.getProjectFrameworkList()));

            projectItemResponseList.add(projectItemResponse);
        }

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

        Sort sort = Sort.by(
                new Sort.Order(sortDirection, "id")
        );

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
        List<ProjectFramework> projectFrameworkList = new ArrayList<>();

        for (FrameworkRequest frameworkRequest : frameworkRequestList) {
            ProjectFramework projectFramework = new ProjectFramework();

            Optional<Framework> framework = frameworkRepository.findByNameAndFrameworkTypeEnum(frameworkRequest.getName().toLowerCase(), frameworkRequest.getFrameworkTypeEnum());

            // framework 가 DB 에 없는 새로운 값인 경우 새로 객체를 만들고 DB 에 저장
            // 그리고 저장한 framework 를 가져온다
            if (framework.isEmpty()) {
                Framework newFramework = new Framework();
                newFramework.setName(frameworkRequest.getName().toLowerCase());
                newFramework.setFrameworkTypeEnum(frameworkRequest.getFrameworkTypeEnum());

                framework = Optional.of(frameworkRepository.save(newFramework));
            }

            projectFramework.setProject(project);
            projectFramework.setFramework(framework.orElseThrow(FrameworkNotFoundException::new));

            projectFrameworkList.add(projectFramework);
        }
        projectFrameworkRepository.saveAll(projectFrameworkList);
    }

    private void saveProjectMemberList(Project project, List<ProjectMemberRequest> projectMemberRequestList) {
        List<ProjectMember> projectMemberList = getProjectMemberListByRequest(project, projectMemberRequestList);
        projectMemberRepository.saveAll(projectMemberList);
    }

    private List<ProjectMember> getProjectMemberListByRequest(Project project, List<ProjectMemberRequest> projectMemberRequestList) {
        List<ProjectMember> projectMemberList = new ArrayList<>();

        for (ProjectMemberRequest projectMemberRequest : projectMemberRequestList) {
            ProjectMember projectMember = new ProjectMember();
            Optional<Member> member = memberRepository.findById(projectMemberRequest.getMemberId());

            projectMember.setProject(project);
            projectMember.setMember(member.orElseThrow(MemberNotFoundException::new));
            projectMember.setProjectMemberType(projectMemberRequest.getProjectMemberTypeEnum());

            projectMemberList.add(projectMember);
        }
        return projectMemberList;
    }

    private void validateMemberList(ProjectRequest projectRequest) {
        for (ProjectMemberRequest projectMemberRequest : projectRequest.getProjectMemberRequestList()) {
            utilMethod.validateMemberId(projectMemberRequest.getMemberId());
        }
    }

    private List<FrameworkResponse> getFrameworkResponseList(List<ProjectFramework> projectFrameworkList) {
        List<FrameworkResponse> frameworkResponseList = new ArrayList<>();

        for (ProjectFramework projectFramework : projectFrameworkList) {
            FrameworkResponse frameworkResponse = frameworkMapper.frameworkToFrameworkResponse(projectFramework.getFramework());

            frameworkResponseList.add(frameworkResponse);
        }
        return frameworkResponseList;
    }

    private List<ProjectMemberResponse> getProjectMemberResponseList(List<ProjectMember> projectMemberList) {
        List<ProjectMemberResponse> projectMemberResponseList = new ArrayList<>();

        for (ProjectMember projectMember : projectMemberList) {
            ProjectMemberResponse projectMemberResponse = new ProjectMemberResponse();

            projectMemberResponse.setProjectMemberTypeEnum(projectMember.getProjectMemberType());
            projectMemberResponse.setMemberResponse(memberMapper.memberToMemberResponse(projectMember.getMember()));

            projectMemberResponseList.add(projectMemberResponse);
        }
        return projectMemberResponseList;
    }


    private Project findProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);
    }

    private void validateOwner(AuthInfo authInfo, Project project) {
        if (!project.isOwner(authInfo.getId())) {
            throw new AuthorizationException();
        }
    }

    public ProjectItemListResponse findSortedProjectListResponse(ProjectListRequest projectListRequest, AuthInfo authInfo) {
        int year = 2024;
        SemesterEnum semester = SemesterEnum.SECOND;
        Slice<Project> sortedProjectSlice = getSortedProjectSlice(projectListRequest, year, semester);
        return projectListToProjectItemListResponse(sortedProjectSlice, authInfo);
    }

    private Slice<Project> getSortedProjectSlice(ProjectListRequest projectListRequest, int year, SemesterEnum semester) {
        Sort sort = Sort.by(Sort.Direction.ASC, "projectTeamNameEnum", "id");
        Pageable pageable = PageRequest.of(projectListRequest.getPageStart(), projectListRequest.getPageSize(), sort);
        return projectRepository.findAllByYearAndSemesterSorted(year, semester, pageable);
    }

    private ProjectResponse createProjectResponse(Project project, AuthInfo authInfo){
        ProjectResponse projectResponse = projectMapper.projectToProjectResponse(project);
        projectResponse.setWriter(memberMapper.memberToMemberResponse(project.getMember()));
        projectResponse.setLoveCount(project.getLoveList().size());
        projectResponse.setLoved(loveRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent());
        projectResponse.setScraped(scrapRepository.findByMemberIdAndProjectId(authInfo.getId(), project.getId()).isPresent());
        projectResponse.setProjectMemberResponseList(getProjectMemberResponseList(project.getProjectMemberList()));
        projectResponse.setNonRegisterProjectMemberResponseList(getNonRegisterProjectMemberResponseList(project.getNonRegisterProjectMemberList()));
        projectResponse.setFrameworkResponseList(getFrameworkResponseList(project.getProjectFrameworkList()));
        return projectResponse;
    }

}



