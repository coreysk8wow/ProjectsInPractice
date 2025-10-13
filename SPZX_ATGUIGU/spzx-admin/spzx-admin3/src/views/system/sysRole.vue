<template>
  <div class="search-div">
    <!-- 搜索表单 -->
    <el-form label-width="70px" size="small">
      <el-form-item label="角色名称">
        <el-input
          v-model="queryDto.roleName"
          style="width: 100%"
          placeholder="角色名称"
        ></el-input>
      </el-form-item>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysRole">
          搜索
        </el-button>
        <el-button size="small" @click="resetData">重置</el-button>
      </el-row>
    </el-form>

    <!-- 添加按钮 -->
    <div class="tools-div">
      <el-button type="success" size="small" @click="addRoleShow">
        添 加
      </el-button>
    </div>
    <!-- 添加角色表单 弹出对话框 -->
    <el-dialog v-model="dialogVisible" header="添加或修改角色" width="30%">
      <el-form label-width="120px">
        <el-form-item label="角色名称">
          <el-input v-model="sysRoleForm.roleName" />
        </el-form-item>
        <el-form-item label="角色Code">
          <el-input v-model="sysRoleForm.roleCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="resetSysRoleForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--- 搜索角色表格数据 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="roleCode" label="角色code" width="180" />
      <el-table-column prop="createTime" label="创建时间" #default="scope">
        {{ formatDateTime(scope.row.createTime) }}
      </el-table-column>
      <el-table-column label="操作" align="center" width="280">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="editRoleShow(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="confirmDelete(scope.row.id)"
          >
            删除
          </el-button>
          <el-button
            type="warning"
            size="small"
            @click="showAssignRoleMenueDialog(scope.row)"
          >
            分配菜单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配菜单的对话框 
// tree组件添加ref属性，后期方便进行tree组件对象的获取
-->
    <el-dialog v-model="dialogMenuVisible" header="分配菜单" width="40%">
      <el-form label-width="80px">
        <el-tree
          :data="sysMenuTreeList"
          ref="treeRef"
          show-checkbox
          default-expand-all
          :check-on-click-node="true"
          node-key="id"
          :props="defaultProps"
        />
        <el-form-item>
          <el-button type="primary" @click="submitAssignMenu">提交</el-button>
          <el-button @click="closeAssignRoleMenuDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--分页条-->
    <el-pagination
      v-model:current-page="pageParams.page"
      v-model:page-size="pageParams.limit"
      :page-sizes="[10, 20, 50, 100]"
      @size-change="fetchData"
      @current-change="fetchData"
      layout="total, sizes, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  DeleteSysRole,
  GetSysRoleListByPage,
  SaveSysRole,
  UpdateSysRole,
  GetSysRoleMenuIds,
  AssignMenuToRole,
} from '@/api/sysRole'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDateTime } from '@/utils/date-util.js'

// 分页条总记录数
let total = ref(0)

// 定义表格数据模型
let list = ref([])

//分页数据
const pageParamsForm = {
  page: 1, // 页码
  limit: 3, // 每页记录数
}
const pageParams = ref(pageParamsForm) // 将pageParamsForm包装成支持响应式的对象

// 搜索表单数据
const queryDto = ref({ roleName: '' })

// 页面加载完毕以后请求后端接口获取数据
onMounted(() => {
  fetchData()
})

// 搜索按钮点击事件处理函数
const searchSysRole = () => {
  //queryDto.value.roleName = ""
  fetchData()
}

// 远程调用后端分页查询接口
const fetchData = async () => {
  const { data, code, message } = await GetSysRoleListByPage(
    pageParams.value.page,
    pageParams.value.limit,
    queryDto.value
  )
  list.value = data.list
  total.value = data.total
}

// 重置搜索条件
const resetData = () => {
  queryDto.value.roleName = ''
  pageParams.value.page = pageParamsForm.page
  pageParams.value.limit = pageParamsForm.limit
  fetchData()
}

// ----------------角色添加-------------------

// 控制角色对话框显示状态, 控制对话框是否显示
const dialogVisible = ref(false)

// 定义角色表单数据模型
const sysRoleForm = ref({
  id: '',
  roleName: '',
  roleCode: '',
})

// 显示添加角色对话框
const addRoleShow = () => {
  dialogVisible.value = true
}

// 修改角色对话框显示
const editRoleShow = row => {
  sysRoleForm.value = { ...row }

  dialogVisible.value = true
}

const submit = () => {
  if (!sysRoleForm.value.roleName || !sysRoleForm.value.roleCode) {
    ElMessage.error('角色名称和角色Code不能为空')
    return
  }
  if (sysRoleForm.value.id) {
    updateRole() // 如果有ID，说明是修改操作
  } else {
    saveSysRole() // 否则是添加操作
  }
}

// 修改角色
const updateRole = async () => {
  const { code, message } = await UpdateSysRole(sysRoleForm.value)
  if (code === 200) {
    ElMessage.success('角色修改成功: ' + message)
    fetchData()
  } else {
    ElMessage.error('角色修改失败: ' + message)
  }

  resetSysRoleForm()
}

// 删除角色
const deleteRole = async id => {
  if (!id) {
    ElMessage.error('角色ID不能为空')
    return
  }

  console.log('delete role, type of id = ', typeof id)

  const { code, message } = await DeleteSysRole(id)
  if (code === 200) {
    ElMessage.success('角色删除成功: ' + message)
  } else {
    ElMessage.error('角色删除失败: ' + message)
  }

  fetchData()
}

// 删除角色 确认对话框
const confirmDelete = id => {
  ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteRole(id)
    })
    .catch(() => {
      ElMessage.info('已取消删除操作')
    })
}

// 保存角色数据
const saveSysRole = async () => {
  const { code, message } = await SaveSysRole(sysRoleForm.value)
  if (code === 200) {
    fetchData()
    ElMessage.success('角色保存成功: ' + message)
  } else {
    ElMessage.error('角色保存失败: ' + message)
  }

  resetSysRoleForm()
}

const resetSysRoleForm = () => {
  sysRoleForm.value.id = ''
  sysRoleForm.value.roleName = ''
  sysRoleForm.value.roleCode = ''
  dialogVisible.value = false
}

//   ----------------------------- 给角色分配菜单 -------------------------------------------

const defaultProps = {
  children: 'children',
  label: 'title',
}
const dialogMenuVisible = ref(false)
const sysMenuTreeList = ref([])

// 树对象变量
const treeRef = ref()

// 默认选中的菜单数据集合
let roleId = ref()
const showAssignRoleMenueDialog = async row => {
  // 在el-tree被mount之前执行这一句，否则treeRef.value是undefined
  dialogMenuVisible.value = true

  roleId.value = row.id
  console.log('typeof roleId {}', typeof roleId.value)
  console.log('typeof row {}', typeof row.id)
  const { data } = await GetSysRoleMenuIds(row.id) // 请求后端地址获取所有的菜单数据，以及当前角色所对应的菜单数据
  sysMenuTreeList.value = data.menuTreeList

  // console.log('treeRef {}', treeRef.value)
  treeRef.value.setCheckedKeys(data.roleMenuIdList) // 进行数据回显
}

const closeAssignRoleMenuDialog = () => {
  roleId.value = null
  treeRef.value.setCheckedKeys([])
  dialogMenuVisible.value = false
}

const submitAssignMenu = async () => {
  const checkedNodes = treeRef.value.getCheckedNodes() // 获取选中的节点
  const checkedNodesIds = checkedNodes.map(node => {
    // 获取选中的节点的id
    return {
      id: node.id,
      isHalf: 0, //全开
    }
  })

  // 获取半选中的节点数据，当一个节点的子节点被部分选中时，该节点会呈现出半选中的状态
  const halfCheckedNodes = treeRef.value.getHalfCheckedNodes()
  const halfCheckedNodesIds = halfCheckedNodes.map(node => {
    // 获取半选中节点的id
    return {
      id: node.id,
      isHalf: 1, // 半开
    }
  })

  // 将选中的节点id和半选中的节点的id进行合并
  const menuIds = [...checkedNodesIds, ...halfCheckedNodesIds]
  // console.log(menuIds);

  // 构建请求数据
  const assignMenuReq = {
    roleId: roleId.value,
    menuIdList: menuIds,
  }

  // 发送请求
  const { code, message } = await AssignMenuToRole(assignMenuReq)
  if (code === 200) {
    ElMessage.success('操作成功')
  } else {
    ElMessage.error('操作失败: ' + message)
  }

  closeAssignRoleMenuDialog()
}
</script>

<style scoped>
.search-div {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}

.tools-div {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  background-color: #fff;
}
</style>
