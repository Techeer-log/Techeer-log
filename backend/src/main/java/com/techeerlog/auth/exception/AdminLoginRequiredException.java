package com.techeerlog.auth.exception;

import com.techeerlog.global.exception.BusinessException;
import com.techeerlog.global.response.ErrorCode;

public class AdminLoginRequiredException extends BusinessException {
    public AdminLoginRequiredException() {
        super(ErrorCode.ADMIN_LOGIN_REQUIRED);
    }
}
