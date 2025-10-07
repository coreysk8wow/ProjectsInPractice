import request from '@/utils/request'

const baseUrl = '/admin/system/sysUser'

export const GetSysUserListByPage = (pageNum, pageSize, queryDto) => {
  return request({
    url: `${baseUrl}/findByPage/${pageNum}/${pageSize}`,
    method: 'get',
    params: queryDto,
  })
}

export const AddSysUser = sysUser => {
  return request({
    url: `${baseUrl}/addUser`,
    method: 'post',
    data: sysUser,
  })
}

export const UpdateSysUser = sysUser => {
  return request({
    url: `${baseUrl}/updateUser`,
    method: 'put',
    data: sysUser,
  })
}

export const DeleteSysUser = id => {
  return request({
    url: `${baseUrl}/deleteById/${id}`,
    method: 'delete',
  })
}

export const GetRolesListByUserId = userId => {
  return request({
    url: `${baseUrl}/findAllRoles/${userId}`,
    method: 'get',
  })
}

// 给用户分配角色请求
export const AssignRoleToUser = assginRole => {
  return request({
    url: `${baseUrl}/assignRoleToUser`,
    method: 'post',
    data: assginRole,
  })
}
