package com.atguigu.spzx.common.exception;

import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.google.common.base.Throwables;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 统一异常处理类
 */
@Slf4j
//@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Result error(Exception e) {
        log.error(Throwables.getStackTraceAsString(e));
        return Result.build(null, ResultCodeEnum.SYSTEM_ERROR);
    }

    @ExceptionHandler(GuiguException.class)
    @ResponseBody
    public Result error(GuiguException e) {
        log.error(Throwables.getStackTraceAsString(e));
        return Result.build(null, e.getResultCodeEnum());
    }
}
