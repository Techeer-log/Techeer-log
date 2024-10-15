package com.techeerlog.love.exception;


import com.techeerlog.global.exception.BusinessException;
import com.techeerlog.global.response.ErrorCode;

public class LoveNotFoundException extends BusinessException {


    public LoveNotFoundException() {
        super(ErrorCode.PROJECT_LOVE_NOT_FOUND_ERROR);
    }
}
