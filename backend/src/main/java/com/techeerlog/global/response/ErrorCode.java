package com.techeerlog.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    INTERNAL_SERVER_ERROR( "G001", 500, "예상치 못한 서버 내부 오류"),
    EXTERNAL_LIBRARY_ERROR("G002", 400, "외부 라이브러리로 인해 예외가 발생했습니다."),
    NO_ACCESS_TOKEN_ERROR("G003", 400, "Access Token이 Header에 존재하지 않습니다."),
    MAX_UPLOAD_SIZE_EXCEEDED_ERROR("G004", 400, "파일 크기가 한도를 초과하였습니다"),


    // Token
    INVALID_ACCESS_TOKEN_ERROR("T001", 400, "유효하지 않은 access 토큰입니다."),
    INVALID_REFRESH_TOKEN_ERROR("T002", 400, "유효하지 않은 refresh 토큰입니다."),
    TOKEN_NOT_FOUND_ERROR("T003", 400, "토큰이 존재하지 않습니다"),
    ANONYMOUS_NOT_ALLOWED_ERROR("T004", 400, "익명 사용자는 접근 불가능한 기능입니다. 로그인 이후 시도 해주세요."),

    // Auth
    AUTHORIZED_ERROR("A001", 400, "접근 권한이 없습니다. 로그인이 유효한지 확인해주세요"),
    LOGIN_FAILED_ERROR("A002", 400, "아이디나 비밀번호가 잘못되었습니다"),
    ADMIN_LOGIN_REQUIRED("A003", 400, "관리자 계정으로 로그인해야 합니다."),
    USER_LOGIN_REQUIRED("A004", 400, "일반 계정으로 로그인해야 합니다."),

    // Member
    DUPLICATE_NICKNAME_ERROR("M001", 400, "이미 존재하는 닉네임입니다."),
    DUPLICATE_LOGINID_ERROR("M002", 400, "이미 존재하는 아이디입니다."),
    INVALID_NICKNAME_ERROR("M003", 400,"잘못된 닉네임 형식입니다."),
    INVALID_LOGIN_ID_ERROR("M004", 400, "잘못된 아이디 형식입니다."),
    INVALID_PASSWORD_FORM_ERROR("M005", 400, "올바른 비밀번호 형식이 아닙니다."),
    INVALID_SIGNUP_FLOW_ERROR("M006", 400, "중복된 아이디입니다."),
    MEMBER_NOT_FOUND_ERROR("M007", 400, "멤버가 존재하지 않습니다."),
    PASSWORD_CONFIRMATION_ERROR("M008", 400, "비밀번호와 비밀번호 확인이 일치하지 않습니다."),
    INCORRECT_PASSWORD_ERROR("M009", 400, "비밀번호가 기존과 일치하지 않습니다."),

    // Project
    INVALID_CONTENT_ERROR("P001", 400, "내용은 1글자 이상 1000글자 이하 입니다."),
    INVALID_TITLE_ERROR("P002", 400, "제목은 1글자 이상 50글자 이하 입니다."),
    PROJECT_NOT_FOUND_ERROR("P003", 400, "해당 프로젝트를 찾을 수 없습니다."),
    PAGEABLE_ACCESS_ERROR("P004", 400, "페이징 과정에서 에러가 발생했습니다"),

    // Comment
    COMMENT_NOT_FOUND_ERROR("C001", 400, "댓글을 찾을 수 없습니다."),
    INVALID_MESSAGE_ERROR("C002", 400, "댓글은 1자이상 255자 이하여야 합니다."),


    // Like
    PROJECT_LOVE_NOT_FOUND_ERROR("L001", 400, "해당 회원이 누른 좋아요가 존재하지 않습니다."),
    PROJECT_LOVE_ALREADY_EXISTS_ERROR("L002", 400, "이미 좋아요를 누른 프로젝트입니다."),

    // Image
    S3_UPLOAD_ERROR("I001", 400, "S3 이미지 업로드가 실패하였습니다"),

    // Framework
    FRAMEWORK_NOT_FOUND_ERROR("F001", 400, "프레임워크가 존재하지 않습니다"),

    // Scrap
    SCRAP_NOT_FOUND_ERROR("S001", 400, "스크랩을 찾을 수 없습니다."),
    SCRAP_DUPLICATE_ERROR("S002", 400, "이미 스크랩한 프로젝트입니다."),
    ;

    private final String code;
    private final int status;
    private final String message;


    @Override
    public String toString() {
        return this.code + " : " + this.message;
    }
}
