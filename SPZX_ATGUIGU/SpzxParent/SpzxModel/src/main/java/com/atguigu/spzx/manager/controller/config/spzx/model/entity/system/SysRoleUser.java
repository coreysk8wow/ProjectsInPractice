package com.atguigu.spzx.manager.controller.config.spzx.model.entity.system;

import com.atguigu.spzx.manager.controller.config.spzx.model.entity.base.BaseEntity;
import lombok.Data;

@Data
public class SysRoleUser extends BaseEntity {

    private Long roleId;       // 角色id
    private Long userId;       // 用户id

}
