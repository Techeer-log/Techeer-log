package consolelog.post.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import consolelog.auth.dto.AuthInfo;
import consolelog.global.result.ResultCode;
import consolelog.helper.ControllerTestHelper;
import consolelog.post.domain.Post;
import consolelog.post.dto.request.NewPostRequest;
import consolelog.post.dto.response.PostResponse;
import consolelog.post.service.PostService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static consolelog.util.fixture.MemberFixture.M1;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(PostController.class)
class PostControllerTest extends ControllerTestHelper {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private PostService postService;
    @Autowired
    private ObjectMapper objectMapper;


    @DisplayName("게시글 조회를 성공한다.")
    @Test
    void findTest() throws Exception {
        String postLog = "";
        Cookie postLogCookie = new Cookie("viewedPost", postLog);
        PostResponse postResponse = PostResponse.builder()
                .id(1L)
                .title("title")
                .content("content")
                .nickname("nickname")
                .likeCount(0)
                .viewCount(0)
                .commentCount(0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        given(postService.findPost(anyLong(), anyString())).willReturn(postResponse);

        mockMvc.perform(get("/api/v1/posts/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .cookie(postLogCookie))
                .andExpect(status().isOk())
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("$.data.id").value(1L))
                .andExpect(jsonPath("$.data.title").value("title"))
                .andExpect(jsonPath("$.data.content").value("content"))
                .andExpect(jsonPath("$.code").value(ResultCode.FIND_POST_SUCCESS.getCode()))
                .andExpect(jsonPath("$.message").value(ResultCode.FIND_POST_SUCCESS.getMessage()))
                .andExpect(jsonPath("$.status").value(ResultCode.FIND_POST_SUCCESS.getStatus()))
                .andDo(print())
                .andReturn();

   }
   @DisplayName("게시글을 작성한다.")
   @Test
   void addPost() throws Exception {
        AuthInfo authinfo = new AuthInfo(1L, "USER", "nickname");
       NewPostRequest newPostRequest = new NewPostRequest("title", "content", "mainImageUrl");
       Post post = Post.builder()
               .id(1L)
               .title("title")
               .content("content")
               .mainImageUrl("mainImageUrl")
               .member(M1)
               .build();
       //given
       given(postService.addPost(newPostRequest, authinfo)).willReturn(1L);

       //when
       when(postService.findPost(1L,"")).thenReturn(PostResponse.from(post));
       // then
       mockMvc.perform(post("/api/v1/posts")
                       .contentType(MediaType.APPLICATION_JSON)
                       .content(objectMapper.writeValueAsString(newPostRequest))
                       .content(objectMapper.writeValueAsString(authinfo)))
               .andExpect(status().isOk())
//               .andExpect(redirectedUrl("/api/v1/posts/1"))
               .andExpect(status().is3xxRedirection())
               .andDo(print())
               .andReturn();

   }



    @Test
    void updatePost() {
    }


    @Test
    void deletePost() {
    }

    @Test
    void findPostList() {
    }

}