package com.atguigu.spzx.manager.service.impl;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSON;
import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.manager.mapper.ISysRoleMapper;
import com.atguigu.spzx.manager.mapper.ISysUserRoleMapper;
import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.AssignRoleReq;
import com.atguigu.spzx.model.request.system.LoginReq;
import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.request.system.SysUserReq;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.model.response.system.LoginResp;
import com.atguigu.spzx.manager.mapper.ISysUserMapper;
import com.atguigu.spzx.manager.service.ISysUserService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class SysUserService implements ISysUserService {

    private final ISysUserMapper sysUserMapper;
    private final ISysUserRoleMapper sysUserRoleMapper;
    private final ISysRoleMapper sysRoleMapper;

    private final RedisTemplate<String , String> redisTemplate;

    @Autowired
    public SysUserService(ISysUserMapper sysUserMapper,
                          RedisTemplate<String , String> redisTemplate,
                          ISysUserRoleMapper sysUserRoleMapper,
                          ISysRoleMapper sysRoleMapper) {
        this.sysUserMapper = sysUserMapper;
        this.redisTemplate = redisTemplate;
        this.sysUserRoleMapper = sysUserRoleMapper;
        this.sysRoleMapper = sysRoleMapper;
    }

    @Override
    public LoginResp login(LoginReq loginReq) {
        // 校验验证码是否正确
        String captcha = loginReq.getCaptcha();     // 用户输入的验证码
        String codeKey = loginReq.getCodeKey();     // redis中验证码的数据key

        // 从Redis中获取验证码
        String redisCode = redisTemplate.opsForValue().get("user:login:validatecode:" + codeKey);
        if(StrUtil.isEmpty(redisCode) || !StrUtil.equalsIgnoreCase(redisCode , captcha)) {
            throw new GuiguException(ResultCodeEnum.VALIDATECODE_ERROR) ;
        }

        // 验证通过后，删除redis中的验证码
        redisTemplate.delete("user:login:validatecode:" + codeKey) ;

        // 根据用户名查询用户
        SysUser sysUser = sysUserMapper.selectByUserName(loginReq.getUserName());
        if (sysUser == null) {
//            throw new RuntimeException("用户名或者密码错误") ;
            throw new GuiguException(ResultCodeEnum.LOGIN_ERROR);
        }

        // 验证密码是否正确
        String inputPassword = loginReq.getPassword();
        String pwdDigest = DigestUtils.md5DigestAsHex(inputPassword.getBytes());
        if (!pwdDigest.equals(sysUser.getPassword())) {
//            throw new RuntimeException("用户名或者密码错误") ;
            throw new GuiguException(ResultCodeEnum.LOGIN_ERROR);
        }

        // 生成令牌，保存数据到Redis中
        String token = UUID.randomUUID().toString().replace("-", "");
        redisTemplate.opsForValue().set("user:login:" + token, JSON.toJSONString(sysUser),
                30, TimeUnit.MINUTES);
        log.debug("User token: {}", token);

        // 构建响应结果对象
        LoginResp loginResp = new LoginResp();
        loginResp.setToken(token);
        loginResp.setRefresh_token("");

        return loginResp;
    }

    @Override
    public void logout(String token) {
        redisTemplate.delete("user:login:" + token);
    }

    @Override
    public SysUser getUserInfo(String token) {
        String userJson = redisTemplate.opsForValue().get("user:login:" + token);
        return JSON.parseObject(userJson , SysUser.class) ;
    }

    @Override
    public void resetUserTimeout(String token, int timeoutInSeconds) {
        redisTemplate.expire("user:login:" + token, timeoutInSeconds, TimeUnit.SECONDS);
    }

    @Override
    public PageInfo<SysUser> findByPage(SysUserReq sysUserReq, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<SysUser> userList = sysUserMapper.findByPage(sysUserReq);
        return new PageInfo<SysUser>(userList);
    }

    @Override
    public SysUser findById(Long id) {
        return sysUserMapper.findById(id);
    }

    @Override
    public void addUser(SysUser sysUser) {
        // 检查用户名是否已存在
        SysUser existingUser = sysUserMapper.selectByUserName(sysUser.getUserName());
        if (existingUser != null) {
            throw new GuiguException(ResultCodeEnum.USER_NAME_IS_EXISTS);
        }

        // 对密码进行MD5加密
        String passwordDigest = DigestUtils.md5DigestAsHex(sysUser.getPassword().getBytes());
        sysUser.setPassword(passwordDigest);

        // 插入用户数据
        sysUserMapper.addUser(sysUser);
    }

    @Override
    public void updateUser(SysUser sysUser) {
        // 检查用户名是否已存在
        SysUser existingUser = findById(sysUser.getId());

        if (existingUser == null) {
            throw new GuiguException(ResultCodeEnum.USER_NOT_EXISTS);
        } else if (!existingUser.getUserName().equals(sysUser.getUserName())) {
            throw new GuiguException(ResultCodeEnum.USERNAME_CHANGING_FORBIDDEN);
        }

        // 对密码进行MD5加密
        if (StrUtil.isNotEmpty(sysUser.getPassword())) {
            String passwordDigest = DigestUtils.md5DigestAsHex(sysUser.getPassword().getBytes());
            sysUser.setPassword(passwordDigest);
        }

        // 更新用户数据
        sysUserMapper.updateById(sysUser);
    }

    @Override
    public void deleteById(Long id, boolean isCascade) {
        sysUserMapper.deleteById(id);
        if (isCascade) {
            sysUserRoleMapper.deleteByUserId(id);
        }
    }

    @Transactional
    @Override
    public void assignRoleToUser(AssignRoleReq assignRoleReq) {
        final Long userId = assignRoleReq.getUserId();
        List<Long> roleIdListNew = assignRoleReq.getRoleIdList();
        Set<Long> roleIdSetNew = new HashSet<>(roleIdListNew);

        List<Long> roleIdListOld = sysUserRoleMapper.getRoleIdsByUserId(userId);
        Set<Long> roleIdSetOld = new HashSet<>(roleIdListOld);

        // Elements in NEW but not in OLD (NEW - OLD)
        Set<Long> onlyInNew = new HashSet<>(roleIdSetNew);
        onlyInNew.removeAll(roleIdSetOld);
        log.debug("Only in NEW: " + onlyInNew);

        // Elements in B but not in NEW (OLD - NEW)
        Set<Long> onlyInOld = new HashSet<>(roleIdSetOld);
        onlyInOld.removeAll(roleIdSetNew);
        log.debug("Only in OLD: " + onlyInOld);

        // Elements in both NEW and OLD (NEW ∩ OLD)
        Set<Long> inBoth = new HashSet<>(roleIdSetNew);
        inBoth.retainAll(roleIdSetOld);
        log.debug("In both NEW and OLD: " + inBoth);

        if (!onlyInNew.isEmpty()) {
            // 如果有新增的角色ID，则插入到sys_user_role表中
            for (Long roleId : onlyInNew) {
                sysUserRoleMapper.insertUserRoleByUserId(userId, roleId);
            }
        }
        if (!onlyInOld.isEmpty()) {
            // 如果有删除的角色ID，则从sys_user_role表中删除
            for (Long roleId : onlyInOld) {
                sysUserRoleMapper.deleteByUserIdAndRoleId(userId, roleId);
            }
        }
    }

}
