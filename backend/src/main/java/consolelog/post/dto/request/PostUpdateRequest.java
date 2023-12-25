package consolelog.post.dto.request;

import lombok.Getter;

@Getter
public class PostUpdateRequest {
    private String title;
    private String content;
    private String mainImageUrl;

    public PostUpdateRequest() {
    }

    public PostUpdateRequest(String title, String content, String mainImageUrl) {
        this.title = title;
        this.content = content;
        this.mainImageUrl = mainImageUrl;
    }
}
