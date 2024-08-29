package com.techeerlog.project.repository;

import com.techeerlog.project.domain.Project;
import com.techeerlog.project.enums.ProjectTypeEnum;
import com.techeerlog.project.enums.RankEnum;
import com.techeerlog.project.enums.SemesterEnum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE project SET view_count = view_count + 1 WHERE project_id = :projectId", nativeQuery = true)
    void updateViewCount(@Param("projectId") Long projectId);

     Slice<Project> findAllByTitleContaining(String title, Pageable pageable);
    Slice<Project> findAllByContentContaining(String content, Pageable pageable);
    Slice<Project> findAllByMemberId(Long memberId, Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%")
    Slice<Project> findAllByTitleOrContentContaining(@Param("keyword") String keyword,Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.projectTypeEnum = :projectTypeEnum " +
            "AND p.year = :year " +
            "AND p.semesterEnum = :semesterEnum " +
            "AND p.rankEnum IN :rankList"
    )
    Slice<Project> findPrizeProjectList(
            @Param("projectTypeEnum") ProjectTypeEnum projectTypeEnum,
            @Param("year") int year,
            @Param("semesterEnum") SemesterEnum semesterEnum,
            @Param("rankList") List<RankEnum> rankList
    );

    @Query("SELECT p FROM Project p WHERE p.year = :year AND p.semesterEnum = :semesterEnum")
    Slice<Project> findAllByYearAndSemesterSorted(
            @Param("year") int year,
            @Param("semesterEnum") SemesterEnum semesterEnum,
            Pageable pageable);


}
