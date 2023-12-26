package consolelog.post.controller;

import consolelog.auth.dto.AuthInfo;
import consolelog.global.result.ResultResponse;
import consolelog.global.support.token.Login;
import consolelog.post.dto.request.NewPostRequest;
import consolelog.post.dto.request.PostUpdateRequest;
import consolelog.post.dto.response.PagePostResponse;
import consolelog.post.dto.response.PostResponse;
import consolelog.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

import static consolelog.global.result.ResultCode.*;

@RestController
@RequestMapping("/v1")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @Operation(summary = "게시글 조회", description = "게시글 조회")
    @GetMapping("/posts/{id}")
    public ResponseEntity<ResultResponse<PostResponse>> findPost(@Parameter(name = "id", description = "posts 의 id", in = ParameterIn.PATH) @PathVariable Long id,
                                                                  @Parameter(name = "postLogCookie", description = "post 의 log", in = ParameterIn.COOKIE) @CookieValue(value = "viewedPost", required = false, defaultValue = "") String postLog) {
        PostResponse findPostResponse = postService.findPost(id, postLog);
        String updatedLog = postService.updatePostLog(id, postLog);
        ResponseCookie responseCookie = ResponseCookie.from("viewedPost", updatedLog).maxAge(86400L).build();
        ResultResponse<PostResponse> resultResponse = new ResultResponse<>(FIND_POST_SUCCESS, findPostResponse);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(resultResponse);
    }

    @Operation(summary = "게시글 추가", description = "게시글 추가")
    @PostMapping("/posts")
    public ResponseEntity<ResultResponse<URI>> addPost(@Valid @RequestBody NewPostRequest newPostRequest,
                                                       @Login AuthInfo authInfo) {
        Long postId = postService.addPost(newPostRequest, authInfo);
        URI location = URI.create("/posts/" + postId);
        ResultResponse<URI> resultResponse = new ResultResponse<>(ADD_POST_SUCCESS, location);

        return ResponseEntity.status(HttpStatus.OK).body(resultResponse);
    }

    @Operation(summary = "게시글 수정", description = "게시글 수정")
    @PutMapping("/posts/{id}")
    public ResponseEntity<ResultResponse<PostResponse>> updatePost(@Parameter(name = "id") @PathVariable Long id,
                                                             @RequestBody PostUpdateRequest postUpdateRequest,
                                                             @Login AuthInfo authInfo) {
        PostResponse postResponse = postService.updatePost(id, postUpdateRequest, authInfo);
        ResultResponse<PostResponse> resultResponse = new ResultResponse<>(UPDATE_POST_SUCCESS, postResponse);
        return ResponseEntity.status(HttpStatus.OK).body(resultResponse);
    }

    @Operation(summary = "게시글 삭제", description = "게시글 삭제")
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<ResultResponse<String>> deletePost(@Parameter(name = "id") @PathVariable Long id, @Login AuthInfo authInfo) {
        postService.deletePost(id, authInfo);
        ResultResponse<String> resultResponse = new ResultResponse<>(DELETE_SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(resultResponse);
    }

    @Operation(summary = "게시글 리스트 조회",
            description = "처음 조회할 때는 lastPostId를 0으로 설정하여 최신 post부터 데이터를 가져옴. " +
                    "<br> page는 0으로 고정 " +
                    "<br> size: 조회할 데이터 수 " +
                    "<br> sort에 string 값을 desc로 변경")
    @GetMapping(path = "/posts/list/{lastPostId}")
    public ResponseEntity<ResultResponse<PagePostResponse>> findPostList(@Parameter(name = "lastPostId") @PathVariable Long lastPostId, Pageable pageable) {
        PagePostResponse postList = postService.findPostsByPage(lastPostId, pageable);
        ResultResponse<PagePostResponse> resultResponse = new ResultResponse<>(FIND_POST_LIST_SUCCESS, postList);
        return ResponseEntity.status(HttpStatus.OK).body(resultResponse);
    }
}