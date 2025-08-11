package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.ISysOperLogMapper;
import com.atguigu.spzx.common.log.service.IOperLogService;
import com.atguigu.spzx.model.entity.system.SysOperLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OperLogService implements IOperLogService {
    private ISysOperLogMapper sysOperLogMapper;

    @Autowired
    public OperLogService(ISysOperLogMapper sysOperLogMapper) {
        this.sysOperLogMapper = sysOperLogMapper;
    }

    @Override
    public void saveSysOperLog(SysOperLog sysOperLog) {
        sysOperLogMapper.insert(sysOperLog);
    }
}
