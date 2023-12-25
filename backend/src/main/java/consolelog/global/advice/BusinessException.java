package consolelog.global.advice;

import consolelog.global.error.ErrorCode;
import lombok.Getter;

import java.util.Arrays;

@Getter
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    @Override
    public String toString() {
        return errorCode.toString() +  ", " + Arrays.toString(this.getStackTrace());
    }
}
