package com.atguigu.spzx.common.log.service.impl;

import com.atguigu.spzx.common.log.mapper.ISysOperLogMapper;
import com.atguigu.spzx.common.log.service.IAsyncOperLogService;
import com.atguigu.spzx.model.entity.system.SysOperLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AsyncOperLogService implements IAsyncOperLogService {
    private ISysOperLogMapper sysOperLogMapper;

    @Autowired
    public AsyncOperLogService(ISysOperLogMapper sysOperLogMapper) {
        this.sysOperLogMapper = sysOperLogMapper;
    }

    @Override
    public void saveSysOperLog(SysOperLog sysOperLog) {
        sysOperLogMapper.insert(sysOperLog);
    }
}
