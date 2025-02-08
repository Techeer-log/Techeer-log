package com.techeerlog.auth.exception;

import com.techeerlog.global.exception.BusinessException;
import com.techeerlog.global.response.ErrorCode;

public class UserLoginRequiredException extends BusinessException {

    public UserLoginRequiredException() {
        super(ErrorCode.USER_LOGIN_REQUIRED);
    }
}
