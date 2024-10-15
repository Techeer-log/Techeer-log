package com.techeerlog.project.service;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.auth.exception.AuthorizationException;
import com.techeerlog.framework.repository.FrameworkRepository;
import com.techeerlog.global.mapper.FrameworkMapper;
import com.techeerlog.global.mapper.MemberMapper;
import com.techeerlog.global.mapper.ProjectMapper;
import com.techeerlog.global.support.UtilMethod;
import com.techeerlog.love.domain.Love;
import com.techeerlog.love.repository.LoveRepository;
import com.techeerlog.member.domain.LoginId;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.domain.Nickname;
import com.techeerlog.member.domain.Password;
import com.techeerlog.member.exception.MemberNotFoundException;
import com.techeerlog.member.repository.MemberRepository;
import com.techeerlog.project.domain.Project;
import com.techeerlog.project.dto.ProjectMemberRequest;
import com.techeerlog.project.dto.ProjectRequest;
import com.techeerlog.project.dto.ProjectResponse;
import com.techeerlog.project.enums.*;
import com.techeerlog.project.exception.ProjectNotFoundException;
import com.techeerlog.project.repository.NonRegisterProjectMemberRepository;
import com.techeerlog.project.repository.ProjectFrameworkRepository;
import com.techeerlog.project.repository.ProjectMemberRepository;
import com.techeerlog.project.repository.ProjectRepository;
import com.techeerlog.scrap.domain.Scrap;
import com.techeerlog.scrap.repository.ScrapRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.awt.print.PrinterJob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {
    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private UtilMethod utilMethod;
    @Mock
    private ProjectMemberRepository projectMemberRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private FrameworkRepository frameworkRepository;
    @Mock
    private ProjectFrameworkRepository projectFrameworkRepository;
    @Mock
    private NonRegisterProjectMemberRepository nonRegisterProjectMemberRepository;
    @Mock
    private LoveRepository loveRepository;
    @Mock
    private ScrapRepository scrapRepository;
    @Spy
    private final ProjectMapper projectMapper = Mappers.getMapper(ProjectMapper.class);
    @Spy
    private final MemberMapper memberMapper = Mappers.getMapper(MemberMapper.class);
    @Spy
    private final FrameworkMapper frameworkMapper = Mappers.getMapper(FrameworkMapper.class);
    @InjectMocks
    private ProjectService projectService;

    @Nested
    class FindProjectResponseTest {
        @Test
        @DisplayName("프로젝트 단일 조회 성공")
        void findProjectResponseTestSuccess() {
            // given
            Member member = createMember(1L);
            Project project = createProject(1L, member);
            Love love = createLove(member, project);
            Scrap scrap = createScrap(member, project);
            AuthInfo authInfo = createAuthInfo(1L);

            when(projectRepository.findById(any()))
                    .thenReturn(Optional.ofNullable(project));
            when(loveRepository.findByMemberIdAndProjectId(any(), any()))
                    .thenReturn(Optional.ofNullable(love));
            when(scrapRepository.findByMemberIdAndProjectId(any(), any()))
                    .thenReturn(Optional.ofNullable(scrap));

            // when
            ProjectResponse projectResponse =
                    projectService.findProjectResponse(1L, authInfo);

            // then
            Assertions.assertEquals(projectResponse.getId(), 1L);
            Assertions.assertEquals(projectResponse.getProjectMemberResponseList().size(), 0);
            Assertions.assertTrue(projectResponse.isLoved());
            Assertions.assertTrue(projectResponse.isScraped());
        }

        @Test
        @DisplayName("projectNotFoundException")
        void findProjectResponseTestThrowProjectNotFoundException() {
            // given
            AuthInfo authInfo = createAuthInfo(1L);

            when(projectRepository.findById(any()))
                    .thenReturn(Optional.empty());

            // when, then
            assertThrows(ProjectNotFoundException.class, () -> {
                projectService.findProjectResponse(1L, authInfo);
            });
        }

        private AuthInfo createAuthInfo(Long id) {
            return new AuthInfo(id, "type", "test");
        }

        private Member createMember(Long memberId) {
            return Member.builder()
                    .id(memberId)
                    .introduction("instruction" + memberId)
                    .loginId(new LoginId("test" + memberId))
                    .nickname(new Nickname("test" + memberId))
                    .password(new Password("1234"))
                    .profileImageUrl("profileImageUrl" + memberId)
                    .build();
        }

        private Project createProject(Long projectId, Member member) {
            return Project.builder()
                    .id(projectId)
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .commentList(Collections.emptyList())
                    .projectFrameworkList(Collections.emptyList())
                    .projectMemberList(Collections.emptyList())
                    .nonRegisterProjectMemberList(Collections.emptyList())
                    .loveList(Collections.emptyList())
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.WEB)
                    .projectTeamNameEnum(ProjectTeamNameEnum.A)
                    .rankEnum(RankEnum.FIRST)
                    .year(2024)
                    .semesterEnum(SemesterEnum.ALL)
                    .member(member)
                    .build();
        }

        private Love createLove(Member member, Project project) {
            return Love.builder()
                    .project(project)
                    .member(member)
                    .build();
        }

        private Scrap createScrap(Member member, Project project) {
            return Scrap.builder()
                    .project(project)
                    .member(member)
                    .build();
        }
    }

    @Nested
    class AddProjectTest {
        @Test
        @DisplayName("프로젝트 추가 성공")
        void addProjectTestSuccess() {
            // given
            Member member = createMember(1L);
            Project project = createProject(1L, member);

            when(projectRepository.save(any())).thenReturn(project);

            ProjectRequest projectRequest = createProjectRequest(1L);
            AuthInfo authInfo = createAuthInfo(1L);

            // when
            Long projectId = projectService.addProject(projectRequest, authInfo);

            // then
            Assertions.assertEquals(1L, projectId);
        }

        @Test
        @DisplayName("프로젝트 멤버 정보 조회 실패")
        void addProjectTestThrowsMemberNotFoundException() {
            // given
            List<ProjectMemberRequest> projectMemberRequestList = createProjectMemberRequestList();
            ProjectRequest projectRequest = createProjectRequest(1L, projectMemberRequestList);
            AuthInfo authInfo = createAuthInfo(1L);

            doThrow(new MemberNotFoundException()).when(utilMethod).validateMemberId(any());
            // void method 예외는 doThrow 사용해 발생 시킨다.

            // when, then
            assertThrows(MemberNotFoundException.class, () -> {
                projectService.addProject(projectRequest, authInfo);
            });
        }

        @Test
        @DisplayName("프로젝트 저장 실패로 인한 ProjectNotFoundException")
        void addProjectTestThrowsProjectNotFoundException() {
            // given
            ProjectRequest projectRequest = createProjectRequest(1L);
            AuthInfo authInfo = createAuthInfo(1L);

            when(projectRepository.save(any())).thenThrow(new ProjectNotFoundException());

            // when, then
            assertThrows(ProjectNotFoundException.class,
                    () -> {projectService.addProject(projectRequest, authInfo);});
        }

        private AuthInfo createAuthInfo(Long id) {
            return new AuthInfo(id, "type", "test");
        }

        private Member createMember(Long memberId) {
            return Member.builder()
                    .id(memberId)
                    .introduction("instruction" + memberId)
                    .loginId(new LoginId("test" + memberId))
                    .nickname(new Nickname("test" + memberId))
                    .password(new Password("1234"))
                    .profileImageUrl("profileImageUrl" + memberId)
                    .build();
        }

        private ProjectMemberRequest createProjectMemberRequest(Long memberId){
            return ProjectMemberRequest.builder()
                    .memberId(memberId)
                    .projectMemberTypeEnum(ProjectMemberTypeEnum.BACKEND)
                    .build();
        }

        private List<ProjectMemberRequest> createProjectMemberRequestList(){
            List<ProjectMemberRequest> projectMemberRequestList = new ArrayList<>();
            for (long memberId = 1; memberId <= 5; memberId++) {
                projectMemberRequestList.add(createProjectMemberRequest(memberId));
            }

            return projectMemberRequestList;
        }

        private ProjectRequest createProjectRequest(Long projectId) {
            return ProjectRequest.builder()
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.WEB)
                    .year(2024)
                    .semesterEnum(SemesterEnum.ALL)
                    .projectMemberRequestList(Collections.emptyList())
                    .frameworkRequestList(Collections.emptyList())
                    .nonRegisterProjectMemberRequestList(Collections.emptyList())
                    .build();
        }
        private ProjectRequest createProjectRequest(Long projectId, List<ProjectMemberRequest> projectMemberRequestList) {
            return ProjectRequest.builder()
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.WEB)
                    .year(2024)
                    .semesterEnum(SemesterEnum.ALL)
                    .projectMemberRequestList(projectMemberRequestList)
                    .frameworkRequestList(Collections.emptyList())
                    .nonRegisterProjectMemberRequestList(Collections.emptyList())
                    .build();
        }

        private Project createProject(Long projectId, Member member) {
            return Project.builder()
                    .id(projectId)
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .commentList(Collections.emptyList())
                    .projectFrameworkList(Collections.emptyList())
                    .projectMemberList(Collections.emptyList())
                    .nonRegisterProjectMemberList(Collections.emptyList())
                    .loveList(Collections.emptyList())
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.WEB)
                    .projectTeamNameEnum(ProjectTeamNameEnum.A)
                    .rankEnum(RankEnum.FIRST)
                    .year(2024)
                    .semesterEnum(SemesterEnum.ALL)
                    .member(member)
                    .build();
        }
    }

    @Nested
    class UpdateProjectTest {
        @Test
        @DisplayName("프로젝트 수정 성공")
        void updateProjectTestSuccess() {
            // given
            Long id = 1L;
            ProjectRequest projectRequest = createProjectRequest(1L);
            AuthInfo authInfo = createAuthInfo(1L);

            Member member = createMember(1L);
            Project project = createProject(1L, member);
            when(projectRepository.findById(any()))
                    .thenReturn(Optional.ofNullable(project));

            // when
            projectService.updateProject(id, projectRequest, authInfo);

            // then
            verify(projectRepository).save(any());

            verify(projectMemberRepository).deleteAllByProjectId(any());
            verify(nonRegisterProjectMemberRepository).deleteAllByProjectId(any());
            verify(projectFrameworkRepository).deleteAllByProjectId(any());

            verify(projectMemberRepository).saveAll(any());
            verify(nonRegisterProjectMemberRepository).saveAll(any());
            verify(projectFrameworkRepository).saveAll(any());
        }

        @Test
        @DisplayName("프로젝트 조회 실패로 인한 수정 실패")
        void updateProjectTestThrowsProjectNotFoundException() {
            // given
            Long id = 1L;
            ProjectRequest projectRequest = createProjectRequest(1L);
            AuthInfo authInfo = createAuthInfo(1L);

            when(projectRepository.findById(any()))
                    .thenReturn(Optional.empty());

            // when, then
            assertThrows(ProjectNotFoundException.class,
                    () -> {projectService.updateProject(id, projectRequest, authInfo);});
        }

        @Test
        @DisplayName("작성자가 아닌 회원 접근으로 인한 수정 실패")
        void updateProjectTestThrowsAuthorizationException() {
            // given
            Long id = 1L;
            ProjectRequest projectRequest = createProjectRequest(1L);
            AuthInfo authInfo = createAuthInfo(2L);

            Member member = createMember(1L);
            Project project = createProject(1L, member);
            when(projectRepository.findById(any()))
                    .thenReturn(Optional.ofNullable(project));

            // when, then
            assertThrows(AuthorizationException.class,
                    () -> {projectService.updateProject(id, projectRequest, authInfo);});
        }

        private AuthInfo createAuthInfo(Long id) {
            return new AuthInfo(id, "type", "test");
        }

        private Member createMember(Long memberId) {
            return Member.builder()
                    .id(memberId)
                    .introduction("instruction" + memberId)
                    .loginId(new LoginId("test" + memberId))
                    .nickname(new Nickname("test" + memberId))
                    .password(new Password("1234"))
                    .profileImageUrl("profileImageUrl" + memberId)
                    .build();
        }

        private ProjectRequest createProjectRequest(Long projectId) {
            return ProjectRequest.builder()
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.APP)
                    .year(2023) // check
                    .semesterEnum(SemesterEnum.ALL)
                    .projectMemberRequestList(Collections.emptyList())
                    .frameworkRequestList(Collections.emptyList())
                    .nonRegisterProjectMemberRequestList(Collections.emptyList())
                    .build();
        }

        private Project createProject(Long projectId, Member member) {
            return Project.builder()
                    .id(projectId)
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .commentList(Collections.emptyList())
                    .projectFrameworkList(Collections.emptyList())
                    .projectMemberList(Collections.emptyList())
                    .nonRegisterProjectMemberList(Collections.emptyList())
                    .loveList(Collections.emptyList())
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.WEB)
                    .projectTeamNameEnum(ProjectTeamNameEnum.A)
                    .rankEnum(RankEnum.FIRST)
                    .year(2024)
                    .semesterEnum(SemesterEnum.ALL)
                    .member(member)
                    .build();
        }
    }

    @Nested
    class DeleteProjectTest {
        @Test
        @DisplayName("프로젝트 삭제 성공")
        void deleteProjectTestSuccess() {
            // given
            Long id = 1L;
            AuthInfo authInfo = createAuthInfo(1L);
            Member member = createMember(1L);
            Project project = createProject(1L, member);

            when(projectRepository.findById(any()))
                    .thenReturn(Optional.ofNullable(project));

            // when
            projectService.deleteProject(id, authInfo);

            // then
            verify(projectRepository).delete(project);
        }

        @Test
        @DisplayName("프로젝트 조회 실패로 인한 삭제 실패")
        void deleteProjectTestThrowsProjectNotFoundException() {
            // given
            Long projectId = 1L;
            AuthInfo authInfo = createAuthInfo(1L);

            when(projectRepository.findById(any()))
                    .thenReturn(Optional.empty());

            // when, then
            assertThrows(ProjectNotFoundException.class,
                    () -> {projectService.deleteProject(projectId, authInfo);});
        }

        @Test
        @DisplayName("작성자가 아닌 회원의 접근으로 인한 삭제 실패")
        void deleteProjectTestThrowsAuthorizationException() {
            // given
            Long projectId = 1L;
            AuthInfo authInfo = createAuthInfo(2L);
            Member member = createMember(1L);
            Project project = createProject(1L, member);

            when(projectRepository.findById(any()))
                    .thenReturn(Optional.ofNullable(project));

            // when, then
            assertThrows(AuthorizationException.class,
                    () -> {projectService.deleteProject(projectId, authInfo);});
        }

        private AuthInfo createAuthInfo(Long id) {
            return new AuthInfo(id, "type", "test");
        }

        private Member createMember(Long memberId) {
            return Member.builder()
                    .id(memberId)
                    .introduction("instruction" + memberId)
                    .loginId(new LoginId("test" + memberId))
                    .nickname(new Nickname("test" + memberId))
                    .password(new Password("1234"))
                    .profileImageUrl("profileImageUrl" + memberId)
                    .build();
        }

        private Project createProject(Long projectId, Member member) {
            return Project.builder()
                    .id(projectId)
                    .title("title" + projectId)
                    .subtitle("subtitle" + projectId)
                    .mainImageUrl("mainImageUrl" + projectId)
                    .content("content" + projectId)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .blogLink("blogLink" + projectId)
                    .githubLink("githubLink" + projectId)
                    .websiteLink("websiteLink" + projectId)
                    .commentList(Collections.emptyList())
                    .projectFrameworkList(Collections.emptyList())
                    .projectMemberList(Collections.emptyList())
                    .nonRegisterProjectMemberList(Collections.emptyList())
                    .loveList(Collections.emptyList())
                    .projectStatusEnum(ProjectStatusEnum.COMPLETED)
                    .projectTypeEnum(ProjectTypeEnum.BOOTCAMP)
                    .platform(PlatformEnum.WEB)
                    .projectTeamNameEnum(ProjectTeamNameEnum.A)
                    .rankEnum(RankEnum.FIRST)
                    .year(2024)
                    .semesterEnum(SemesterEnum.ALL)
                    .member(member)
                    .build();
        }
    }
}
