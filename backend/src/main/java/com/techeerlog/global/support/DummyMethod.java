package com.techeerlog.global.support;

import com.techeerlog.framework.domain.Framework;
import com.techeerlog.framework.enums.FrameworkTypeEnum;
import com.techeerlog.framework.repository.FrameworkRepository;
import com.techeerlog.member.domain.LoginId;
import com.techeerlog.member.domain.Member;
import com.techeerlog.member.domain.Nickname;
import com.techeerlog.member.domain.Password;
import com.techeerlog.member.repository.MemberRepository;
import com.techeerlog.project.domain.Project;
import com.techeerlog.project.enums.*;
import com.techeerlog.project.repository.ProjectRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Profile("dev")
@Component
public class DummyMethod {

    @Autowired
    private FrameworkRepository frameworkRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @PostConstruct
    public void init() {
        createFrameworks();
        createMembers();
        createProjects();
    }

    private void createFrameworks() {
        List<Framework> frameworks = Arrays.asList(
                new Framework(1L, "Spring", FrameworkTypeEnum.BACKEND),
                new Framework(2L, "Django", FrameworkTypeEnum.BACKEND),
                new Framework(3L, "Angular", FrameworkTypeEnum.FRONTEND)
        );
        frameworkRepository.saveAll(frameworks);
    }

    private void createMembers() {
        List<Member> members = Arrays.asList(
                new Member(1L, new LoginId("test1"), new Password("1234"), new Nickname("test1"), "profileImageUrl1", "introduction1"),
                new Member(2L, new LoginId("test2"), new Password("1234"), new Nickname("test2"), "profileImageUrl2", "introduction2"),
                new Member(3L, new LoginId("test3"), new Password("1234"), new Nickname("test3"), "profileImageUrl3", "introduction3"),
                new Member(4L, new LoginId("test4"), new Password("1234"), new Nickname("test4"), "profileImageUrl4", "introduction4")
        );
        memberRepository.saveAll(members);
    }


    private void createProjects() {
        Member member = memberRepository.findById(1L).orElse(null);

        List<Project> projects = new ArrayList<>();
        Long i = 1L;
        ProjectTeamNameEnum[] teamNames = ProjectTeamNameEnum.values();
        RankEnum[] ranks = {RankEnum.FIRST, RankEnum.SECOND, RankEnum.THIRD, RankEnum.FOURTH, RankEnum.FIFTH};

        int[] years = {2022, 2023, 2024};
        SemesterEnum[] semesters = {SemesterEnum.FIRST, SemesterEnum.SECOND};

        for (int year : years) {
            for (SemesterEnum semester : semesters) {
                for (int j = 0; j < 5; j++) {
                    RankEnum rank = ranks[j];

                    projects.add(new Project(
                            i++, "mainImageUrl" + i, "title" + i, "subtitle" + i, "content" + i,
                            LocalDate.now(), LocalDate.now(), PlatformEnum.WEB, ProjectTypeEnum.BOOTCAMP,
                            teamNames[j % teamNames.length], year, semester,
                            rank, ProjectStatusEnum.COMPLETED,
                            "githubLink" + i, "blogLink" + i, "websiteLink" + i, member,
                            new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>()
                    ));
                }
            }
        }

        projectRepository.saveAll(projects);
    }


}