package com.techeerlog.scrap.repository;

import com.techeerlog.scrap.domain.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    //특정 멤버와 프로젝트에 대한 스크랩 찾기
    Optional<Scrap> findByMemberIdAndProjectId(Long memberId, Long projectId);

    boolean existsByMemberIdAndProjectId(Long memberId, Long projectId);

    List<Scrap> findAllByMemberId(Long memberId);


}
