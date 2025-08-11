package com.atguigu.spzx.common.log.aspect;

import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.common.log.annotation.Log;
import com.atguigu.spzx.common.log.service.IOperLogService;
import com.atguigu.spzx.common.log.utils.LogUtil;
import com.atguigu.spzx.model.entity.system.SysOperLog;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.google.common.base.Throwables;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Aspect
public class LogAspect {

    @Autowired
    private IOperLogService operLogService;

    @Around(value = "@annotation(sysLog)")
    public Object logAround(ProceedingJoinPoint joinPoint, Log sysLog) throws Throwable {
        SysOperLog sysOperLog = new SysOperLog();

        LogUtil.beforeHandleLog(sysLog, joinPoint, sysOperLog);

        Object result = null;
        try {
            result = joinPoint.proceed();
            LogUtil.afterHandlLog(sysLog, result, sysOperLog, 0, null);
        } catch (Exception e) {
            String stackTrack = Throwables.getStackTraceAsString(e);
            log.error(stackTrack);
            LogUtil.afterHandlLog(sysLog, result, sysOperLog, 1, e.getMessage());
            throw new GuiguException(ResultCodeEnum.SYSTEM_ERROR);
        }

        operLogService.saveSysOperLog(sysOperLog);

        return result;
    }
}
