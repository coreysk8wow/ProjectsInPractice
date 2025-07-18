import request from '@/utils/request'

const base_url = '/admin/system/sysRole'

// 分页查询角色数据
export const GetSysRoleListByPage = (pageNum, pageSize, queryDto) => {
  return request({
    url: `${base_url}/findByPage/${pageNum}/${pageSize}`,
    method: 'post',
    data: queryDto,
  })
}

// 保存角色数据
export const SaveSysRole = sysRole => {
  return request({
    url: `${base_url}/save`,
    method: 'post',
    data: sysRole,
  })
}

// 修改角色数据
export const UpdateSysRole = sysRole => {
  return request({
    url: `${base_url}/updateById`,
    method: 'put',
    data: sysRole,
  })
}

// 删除角色数据
export const DeleteSysRole = id => {
  return request({
    url: `${base_url}/deleteById/${id}`,
    method: 'delete',
  })
}
