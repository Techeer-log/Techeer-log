package consolelog.post.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class FindPostRequest {
    @NotBlank(message = "게시글 id를 입력해주세요")
    private Long id;

    public FindPostRequest(Long id) {
        this.id = id;
    }
}
