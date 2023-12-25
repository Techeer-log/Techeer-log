package consolelog.post.dto.response;

import consolelog.post.domain.Post;
import lombok.Getter;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PagePostResponse {

    private List<PostResponse> posts;
    private Boolean lastpage;

    public PagePostResponse(List<PostResponse> posts, Boolean lastpage) {
        this.posts = posts;
        this.lastpage = lastpage;
    }

    public static PagePostResponse of(Slice<Post> posts) {
        List<PostResponse> postsResponses = posts.getContent()
                .stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
        return new PagePostResponse(postsResponses, posts.hasNext());
    }
}
