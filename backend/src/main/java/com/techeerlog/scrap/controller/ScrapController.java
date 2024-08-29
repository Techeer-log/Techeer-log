package com.techeerlog.scrap.controller;

import com.techeerlog.auth.dto.AuthInfo;
import com.techeerlog.global.response.ResultResponse;
import com.techeerlog.global.response.SimpleResultResponse;
import com.techeerlog.global.support.token.Login;
import com.techeerlog.scrap.dto.ScrapProjectItemResponse;
import com.techeerlog.scrap.service.ScrapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.techeerlog.global.response.ResultCode.*;

@Tag(name = "Scrap", description = "Scrap API Document")
@RestController
@RequestMapping("/v1")
public class ScrapController {
    private final ScrapService scrapService;
    public ScrapController(ScrapService scrapService) {
        this.scrapService = scrapService;
    }

    @Operation(summary = "스크랩 하기", description = "스크랩 하기")
    @PostMapping("/scraps/{projectId}")
    public ResponseEntity<SimpleResultResponse> createScrap(@PathVariable("projectId") Long projectId,
                                                            @Login AuthInfo authInfo) {
        scrapService.createScrap(projectId, authInfo);
        SimpleResultResponse resultResponse = new SimpleResultResponse(SCRAP_CREATED_SUCCESS);

        return ResponseEntity.status(SCRAP_CREATED_SUCCESS.getStatus()).body(resultResponse);

    }

    @Operation(summary = "스크랩 취소", description = "스크랩 취소")
    @DeleteMapping("/scraps/{projectId}")
    public ResponseEntity<SimpleResultResponse> deleteScrap(@PathVariable("projectId") Long projectId,
                                                                     @Login AuthInfo authInfo) {
        scrapService.deleteScrap(projectId, authInfo);
        SimpleResultResponse resultResponse = new SimpleResultResponse(SCRAP_DELETED_SUCCESS);

        return ResponseEntity.status(SCRAP_DELETED_SUCCESS.getStatus()).body(resultResponse);
    }

    @Operation(summary = "스크랩 리스트 조회", description = "스크랩 리스트 조회")
    @GetMapping("/scraps")
    public ResponseEntity<ResultResponse<List<ScrapProjectItemResponse>>> findScrapList(@Login AuthInfo authInfo) {

        List<ScrapProjectItemResponse> scrapProjectItemResponses = scrapService.findScrapList(authInfo);

        ResultResponse<List<ScrapProjectItemResponse>> resultResponse = new ResultResponse<>(SCRAP_LIST_SUCCESS, scrapProjectItemResponses);

        return ResponseEntity.status(SCRAP_LIST_SUCCESS.getStatus()).body(resultResponse);
    }


}
