package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.system.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ISysUserRoleMapper {
    List<Long> getRoleIdsByUserId(Long userId);

    void deleteByUserId(Long userId);

    void deleteByUserIdAndRoleId(@Param("userId") Long userId,
                                 @Param(("roleId")) Long roleId);

    void insertUserRoleByUserId(@Param("userId") Long userId,
                        @Param(("roleId")) Long roleId);

    int countUserByRoleId(Long roleId);
}
