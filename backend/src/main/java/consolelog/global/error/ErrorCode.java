package consolelog.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    INTERNAL_SERVER_ERROR( "G001", 500, "예상치 못한 서버 내부 오류"),
    EXTERNAL_LIBRARY_ERROR("GOO2", 400, "외부 라이브러리로 인해 예외가 발생했습니다."),

    // Token
    INVALID_ACCESS_TOKEN_ERROR("TOO1", 400, "유효하지 않은 access 토큰입니다."),
    INVALID_REFRESH_TOKEN_ERROR("TOO2", 400, "유효하지 않은 refresh 토큰입니다."),
    TOKEN_NOT_FOUND_ERROR("TOO3", 400, "토큰이 존재하지 않습니다"),

    // Auth
    AUTHORIZED_ERROR("A001", 400, "접근 권한이 없습니다. 로그인이 유효한지 확인해주세요"),
    LOGIN_FAILED_ERROR("A002", 400, "아이디나 비밀번호가 잘못되었습니다"),

    // Member
    DUPLICATE_NICKNAME_ERROR("M001", 400, "이미 존재하는 닉네임입니다."),
    INVALID_NICKNAME_ERROR("M002", 400,"잘못된 닉네임 형식입니다."),
    INVALID_LOGIN_ID_ERROR("M003", 400, "잘못된 아이디 형식입니다."),
    INVALID_PASSWORD_FORM_ERROR("M004", 400, "올바른 비밀번호 형식이 아닙니다."),
    INVALID_SIGNUP_FLOW_ERROR("M005", 400, "비정상적인 회원가입 절차입니다."),
    MEMBER_NOT_FOUND_ERROR("M006", 400, "멤버가 존재하지 않습니다."),
    PASSWORD_CONFIRMATION_ERROR("M007", 400, "비밀번호와 비밀번호 확인이 일치하지 않습니다."),

    // Post
    INVALID_CONTENT_ERROR("P001", 400, "내용은 1글자 이상 1000글자 이하 입니다."),
    INVALID_TITLE_ERROR("P002", 400, "제목은 1글자 이상 50글자 이하 입니다."),
    POST_NOT_FOUND_ERROR("POO3", 400, "해당 게시글을 찾을 수 없습니다."),

    // Comment
    COMMENT_NOT_FOUND_ERROR("C001", 400, "댓글을 찾을 수 없습니다."),
    INVALID_MESSAGE_ERROR("C002", 400, "댓글은 1자이상 255자 이하여야 합니다."),
    REPLY_DEPTH_ERROR("C003", 400, "대댓글에 답글을 달 수 없습니다."),


    // Like
    COMMENT_LIKE_NOT_FOUND_ERROR("L001", 400, "해당 회원이 누른 좋아요가 존재하지 않습니다."),

    // Image
    S3_UPLOAD_ERROR("I001", 400, "S3 이미지 업로드가 실패하였습니다"),

    ;

    private final String code;
    private final int status;
    private final String message;


    @Override
    public String toString() {
        return this.code + " : " + this.message;
    }
}
