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
    <el-dialog v-model="dialogVisible" title="添加或修改角色" width="30%">
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
      <el-table-column prop="createTime" label="创建时间" />
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
        </template>
      </el-table-column>
    </el-table>

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
} from '@/api/sysRole'
import { ElMessage, ElMessageBox } from 'element-plus'

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
