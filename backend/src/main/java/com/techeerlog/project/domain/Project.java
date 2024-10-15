package com.techeerlog.project.domain;

import com.techeerlog.comment.domain.Comment;
import com.techeerlog.global.config.BaseEntity;
import com.techeerlog.love.domain.Love;
import com.techeerlog.member.domain.Member;
import com.techeerlog.project.enums.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(value = {AuditingEntityListener.class})
@SQLDelete(sql = "UPDATE project SET deleted = TRUE WHERE project_id = ?")
@SQLRestriction("deleted = FALSE")
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;

    private String mainImageUrl;

    @Column(nullable = false)
    private String title;

    private String subtitle;

    @Lob
    @Column(nullable = false)
    private String content;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private PlatformEnum platform;

    @Enumerated(EnumType.STRING)
    private ProjectTypeEnum projectTypeEnum;

    @Enumerated(EnumType.STRING)
    private ProjectTeamNameEnum projectTeamNameEnum;

    private int year;

    @Enumerated(EnumType.STRING)
    private SemesterEnum semesterEnum;

    @Enumerated(EnumType.STRING)
    private RankEnum rankEnum = RankEnum.NONE;

    @Enumerated(EnumType.STRING)
    private ProjectStatusEnum projectStatusEnum;
    private String githubLink;
    private String blogLink;
    private String websiteLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "project")
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Love> loveList = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ProjectMember> projectMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<NonRegisterProjectMember> nonRegisterProjectMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<ProjectFramework> projectFrameworkList = new ArrayList<>();

    public boolean isOwner(Long accessMemberId) {
        if (accessMemberId == null) {
            return false;
        }
        return member.getId().equals(accessMemberId);
    }
}