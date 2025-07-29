package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.ISysRoleMenuMapper;
import com.atguigu.spzx.manager.service.ISysMenuService;
import com.atguigu.spzx.manager.service.ISysRoleMenuService;
import com.atguigu.spzx.model.entity.system.SysMenu;
import com.atguigu.spzx.model.request.system.AssignMenuReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SysRoleMenuService implements ISysRoleMenuService {
    private ISysMenuService sysMenuService;
    private ISysRoleMenuMapper sysRoleMenuMapper;

    @Autowired
    public SysRoleMenuService(ISysMenuService sysMenuService,
                              ISysRoleMenuMapper sysRoleMenuMapper) {
        this.sysMenuService = sysMenuService;
        this.sysRoleMenuMapper = sysRoleMenuMapper;
    }

    @Override
    public Map<String, Object> findSysRoleMenuByRoleId(Long roleId) {
        List<SysMenu> menuTreeList = sysMenuService.genMenuTree();
        List<Long> roleMenuIdList = sysRoleMenuMapper.selectMenuIdsByRoleId(roleId);

        Map<String, Object> result = Map.of(
                "menuTreeList", menuTreeList,
                "roleMenuIdList", roleMenuIdList
        );

        return result;
    }

    @Transactional
    @Override
    public void assignMenuToRole(AssignMenuReq assignMenuReq) {
        sysRoleMenuMapper.deleteByRoleId(assignMenuReq.getRoleId());

        List<Map<String, Long>> menuInfo = assignMenuReq.getMenuIdList();
        if (menuInfo != null && !menuInfo.isEmpty()) {
            sysRoleMenuMapper.insertRoleMenuByRoleId(assignMenuReq);
        }
    }
}
