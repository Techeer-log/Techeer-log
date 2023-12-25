package consolelog.comment.dto;


import consolelog.comment.domain.Comment;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ReplyResponse {
    private final Long parentId;
    private final Long id;
    private final String nickname;
    private final String profileImageUrl;
    private final String content;
    private final LocalDateTime createdAt;
    private final int likeCount;
    private final boolean like;

    public ReplyResponse(Long parentId, Long Id, String nickname, String profileImageUrl, String content, LocalDateTime createdAt,
                         int likeCount, boolean like) {
        this.parentId = parentId;
        this.id = Id;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.content = content;
        this.createdAt = createdAt;
        this.likeCount = likeCount;
        this.like = like;
    }

    public static ReplyResponse of(Comment reply, boolean like) {
        return new ReplyResponse(reply.getParent().getId(), reply.getId(), reply.getNickname(),
                reply.getMember().getProfileImageUrl(), reply.getMessage(), reply.getCreatedAt(),
                reply.getCommentLikesCount(), like);
    }
}
