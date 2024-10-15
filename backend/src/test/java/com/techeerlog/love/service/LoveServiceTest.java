package com.techeerlog.love.service;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.global.support.UtilMethod;
import com.techeerlog.love.domain.Love;
import com.techeerlog.love.exception.LoveAlreadyExistsException;
import com.techeerlog.love.repository.LoveRepository;
import com.techeerlog.member.domain.Member;
import com.techeerlog.project.domain.Project;
import com.techeerlog.project.exception.ProjectNotFoundException;
import com.techeerlog.project.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LoveServiceTest {
    @Mock
    private LoveRepository loveRepository;
    @Mock
    private ProjectRepository projectRepository;
    @Mock
    private UtilMethod utilMethod;

    @InjectMocks
    private LoveService loveService;

    private Long projectId;
    private AuthInfo authInfo;
    private Project project;
    private Member member;

    @BeforeEach
    void setUp() {
        projectId = 1L;
        authInfo = new AuthInfo(1L, "username", "ROLE_USER");
        project = new Project();
        project.setId(projectId);
        member = new Member();

    }


    @Test
    @DisplayName("프로젝트 좋아요 성공 테스트")
    void addLoveSuccess() {
        // given
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(utilMethod.findMemberByAuthInfo(authInfo)).thenReturn(member);
        when(loveRepository.existsByMemberIdAndProjectId(member.getId(), project.getId())).thenReturn(false);

        // when
        loveService.addLove(projectId, authInfo);

        // then
        verify(loveRepository, times(1)).save(any(Love.class));
    }

    @Test
    @DisplayName("프로젝트 좋아요 취소 성공 테스트")
    void deleteLoveSuccess() {
        //given
        Love love = Love.builder()
                .member(member)
                .project(project)
                .build();


        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(utilMethod.findMemberByAuthInfo(authInfo)).thenReturn(member);
        when(loveRepository.findByMemberIdAndProjectId(member.getId(),project.getId())).thenReturn(Optional.of(love));

        // when
        loveService.deleteLove(projectId, authInfo);

        //then
        verify(loveRepository, times(1)).delete(love);

    }

    @Test
    @DisplayName("이미 좋아요가 눌린 프로젝트에 좋아요 추가 시 실패 테스트")
    void addLoveAlreadyExistsFailure(){
        //given
        when(projectRepository.findById(projectId)).thenReturn(Optional.of(project));
        when(utilMethod.findMemberByAuthInfo(authInfo)).thenReturn(member);
        when(loveRepository.existsByMemberIdAndProjectId(member.getId(), project.getId())).thenReturn(true);

        //when then
        assertThrows(LoveAlreadyExistsException.class, () -> loveService.addLove(projectId, authInfo));

    }

    @Test
    @DisplayName("존재하지 않는 프로젝트에 좋아요 추가 시 실패 테스트")
    void addLoveNonExistingProjectFailure() {
        //given
        when(projectRepository.findById(projectId)).thenReturn(Optional.empty());

        //when, then
        assertThrows(ProjectNotFoundException.class, () -> loveService.addLove(projectId, authInfo));
    }

}
