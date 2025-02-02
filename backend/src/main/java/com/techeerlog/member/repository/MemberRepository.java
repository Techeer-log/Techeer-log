package com.techeerlog.member.repository;

import com.techeerlog.member.domain.Member;
import com.techeerlog.member.domain.Nickname;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsMemberByLoginIdValue(String loginId);

    boolean existsMemberByNickname(Nickname nickname);

    boolean existsMemberByNicknameValue(String nickname);

    Optional<Member> findByLoginIdValue(String loginId);
}
