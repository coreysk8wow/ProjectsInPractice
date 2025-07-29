package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.request.system.AssignMenuReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ISysRoleMenuMapper {
    List<Long> selectMenuIdsByRoleId(Long roleId);

    void insertRoleMenuByRoleId(AssignMenuReq assignMenuReq);

    void deleteByRoleIdAndMenuId(AssignMenuReq assignMenuReq);

    void deleteByRoleId(Long roleId);

    void deleteByMenuId(Long menuId);

    /**
     *
     * @param menuId
     * @param isHalf 1: 半选 0: 全选
     */
    void updateIsHalfByMenuId(Long menuId, Integer isHalf);
}
