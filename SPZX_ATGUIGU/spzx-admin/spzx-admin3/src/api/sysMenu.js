import request from '@/utils/request'

const base_url = '/admin/system/sysMenu'

// 分页列表
export const GetMenuTree = () => {
    return request({
        url: `${base_url}/getMenuTree`,
        method: 'get',
    })
}

// 保存信息
export const AddMenu = sysMenu => {
    return request({
        url: `${base_url}/add`,
        method: 'post',
        data: sysMenu,
    })
}

// 修改信息
export const UpdateMenuById = sysMenu => {
    return request({
        url: `${base_url}/updateById`,
        method: 'put',
        data: sysMenu,
    })
}

// 根据id删除数据
export const DeleteMenuById = id => {
    return request({
        url: `${base_url}/deleteById/${id}`,
        method: 'delete',
    })
}
