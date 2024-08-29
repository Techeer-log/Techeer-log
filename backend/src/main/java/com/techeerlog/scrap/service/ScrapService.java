package com.techeerlog.scrap.service;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.framework.dto.FrameworkResponse;
import com.techeerlog.global.mapper.FrameworkMapper;
import com.techeerlog.global.support.UtilMethod;
import com.techeerlog.member.domain.Member;
import com.techeerlog.project.domain.Project;
import com.techeerlog.project.enums.ProjectStatusEnum;
import com.techeerlog.project.exception.ProjectNotFoundException;
import com.techeerlog.project.repository.ProjectRepository;
import com.techeerlog.scrap.domain.Scrap;
import com.techeerlog.scrap.dto.ScrapProjectItemResponse;
import com.techeerlog.scrap.exception.ScrapAlreadyExistsException;
import com.techeerlog.scrap.exception.ScrapNotFoundException;
import com.techeerlog.scrap.repository.ScrapRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ScrapService {
    private final ScrapRepository scrapRepository;
    private final ProjectRepository projectRepository;
    private final UtilMethod utilMethod;

    private final FrameworkMapper frameworkMapper;

    public ScrapService(ScrapRepository scrapRepository,
                        ProjectRepository projectRepository,
                        UtilMethod utilMethod,
                        FrameworkMapper frameworkMapper) {
        this.scrapRepository = scrapRepository;
        this.projectRepository = projectRepository;
        this.utilMethod = utilMethod;
        this.frameworkMapper = frameworkMapper;
    }

    public void createScrap(Long projectId, AuthInfo authInfo) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);
        Member member = utilMethod.findMemberByAuthInfo(authInfo);

        // 스크랩 중복 확인
        if (scrapRepository.existsByMemberIdAndProjectId(member.getId(), project.getId())) {
            throw new ScrapAlreadyExistsException();
        }
        Scrap scrap = Scrap.builder()
                .project(project)
                .member(member)
                .build();
        scrapRepository.save(scrap);

    }

    public void deleteScrap(Long projectId, AuthInfo authInfo) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(ProjectNotFoundException::new);
        Member member = utilMethod.findMemberByAuthInfo(authInfo);

        Optional<Scrap> scrap = scrapRepository.findByMemberIdAndProjectId(member.getId(), project.getId());
        if (scrap.isEmpty()) {
            throw new ScrapNotFoundException();
        }
        scrapRepository.delete(scrap.get());
    }

    public List<ScrapProjectItemResponse> findScrapList(AuthInfo authInfo) {
        List<Scrap> scraps = scrapRepository.findAllByMemberId(authInfo.getId());
        List<ScrapProjectItemResponse> scrappedProjects = new ArrayList<>();

        for (Scrap scrap : scraps) {
            Project project = scrap.getProject();

            List<FrameworkResponse> frameworkResponses = project.getProjectFrameworkList().stream()
                    .map(projectFramework -> frameworkMapper.frameworkToFrameworkResponse(projectFramework.getFramework()))
                    .toList();

            ScrapProjectItemResponse scrapProjectItemResponse = new ScrapProjectItemResponse(
                    project.getId(),
                    project.getMainImageUrl(),
                    project.getTitle(),
                    project.getSubtitle(),
                    true,
                    project.getProjectStatusEnum() == ProjectStatusEnum.RUNNING,
                    frameworkResponses

            );
            scrappedProjects.add(scrapProjectItemResponse);

        }
        return scrappedProjects;
    }


}
