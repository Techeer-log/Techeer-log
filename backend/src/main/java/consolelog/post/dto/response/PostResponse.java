package consolelog.post.dto.response;

import consolelog.post.domain.Post;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String mainImageUrl;
    private String nickname;
    private String profileImageUrl;
    private int likeCount;
    private int viewCount;
    private int commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostResponse() {
    }

    @Builder
    private PostResponse(Long id, String title, String content, String mainImageUrl, String nickname,
                         String profileImageUrl, int likeCount, int viewCount, int commentCount,
                         LocalDateTime createdAt, LocalDateTime updatedAt) { //생성자 주입, 초기화
        this.id = id;
        this.title = title;
        this.content = content;
        this.mainImageUrl = mainImageUrl;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.commentCount = commentCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // of 메소드를 통해 FindPostResponse 객체를 생성
    public static PostResponse from(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .mainImageUrl(post.getMainImageUrl())
                .nickname(post.getMember().getNickname())
                .profileImageUrl(post.getMember().getProfileImageUrl())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

}
