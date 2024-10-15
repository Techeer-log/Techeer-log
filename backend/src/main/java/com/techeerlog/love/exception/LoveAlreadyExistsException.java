package com.techeerlog.love.exception;

import com.techeerlog.global.exception.BusinessException;
import com.techeerlog.global.response.ErrorCode;

public class LoveAlreadyExistsException extends BusinessException {
    public LoveAlreadyExistsException() {
        super(ErrorCode.PROJECT_LOVE_ALREADY_EXISTS_ERROR);
    }
}
