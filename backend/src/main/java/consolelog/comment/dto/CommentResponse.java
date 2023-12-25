package consolelog.comment.dto;

import consolelog.comment.domain.Comment;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

// 하나의 댓글 정보를 전달하기 위한 DTO >> 단일 댓글 정보를 클라이언트로 전송할 때 사용
@Getter
public class CommentResponse {

    private final Long commentId;
    private final String nickname;
    private final String profileImageUrl;
    private final String content;
    private final LocalDateTime createdAt;
    private final int likeCount;
    private final boolean like;
    private final List<ReplyResponse> replies;


    public CommentResponse(Long commentId, String nickname, String content, LocalDateTime createdAt,
                           boolean authorized, String profileImageUrl, int likeCount, boolean like,
                           List<ReplyResponse> replies) {
        this.commentId = commentId;
        this.nickname = nickname;
        this.content = content;
        this.createdAt = createdAt;
        this.profileImageUrl = profileImageUrl;
        this.likeCount = likeCount;
        this.like = like;
        this.replies = replies;
    }

    public static CommentResponse of(Comment comment, Long accessMemberId, List<ReplyResponse> replyResponses,
                                     boolean isLike) {
        return new CommentResponse(comment.getId(), comment.getNickname(), comment.getMessage(),
                comment.getCreatedAt(), comment.isAuthorized(accessMemberId),
                comment.getMember().getProfileImageUrl(), comment.getCommentLikesCount(), isLike, replyResponses);
    }

    public static CommentResponse softRemovedOf(Comment comment, List<ReplyResponse> replyResponses) {
        return new CommentResponse(comment.getId(), "", null, null, false,
                comment.getMember().getProfileImageUrl(), 0, false, replyResponses);
    }


}
