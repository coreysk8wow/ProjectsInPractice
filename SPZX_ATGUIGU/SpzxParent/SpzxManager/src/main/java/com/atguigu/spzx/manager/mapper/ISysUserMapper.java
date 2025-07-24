package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.request.system.SysUserReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ISysUserMapper {

    /**
     * 根据用户名查询用户数据
     *
     * @param userName
     * @return
     */
    SysUser selectByUserName(String userName);

    SysUser findById(Long id);

    List<SysUser> findByPage(SysUserReq sysUserReq);

    void addUser(SysUser sysUser);

    void updateById(SysUser sysUser);

    void deleteById(Long id);

}
