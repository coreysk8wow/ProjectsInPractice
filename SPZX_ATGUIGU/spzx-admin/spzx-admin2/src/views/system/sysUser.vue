<template>
  <!---搜索表单-->
  <div class="search-div">
    <el-form label-width="70px" size="small">
      <el-row>
        <el-col :span="12">
          <el-form-item label="关键字">
            <el-input
              v-model="queryDto.keyword"
              style="width: 100%"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="createTimeBounderies"
              type="daterange"
              range-separator="To"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="display:flex">
        <el-button type="primary" size="small" @click="searchSysUser">
          搜索
        </el-button>
        <el-button size="small" @click="resetSearchSysUserForm">重置</el-button>
      </el-row>
    </el-form>
  </div>

  <!--添加按钮-->
  <div class="tools-div">
    <el-button type="success" size="small" @click="addSysUserShow">
      添 加
    </el-button>
  </div>

  <el-dialog v-model="dialogVisible" v-bind:title="dialogTitle" width="40%">
    <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="sysUser.userName" />
      </el-form-item>
      <el-form-item v-if="isAdd" label="密码">
        <el-input type="password" show-password v-model="sysUser.password" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="sysUser.name" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="sysUser.phone" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8501/admin/system/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="headers"
        >
          <img v-if="sysUser.avatar" :src="sysUser.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="sysUser.description" />
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="sysUser.status" />
      </el-form-item>
      <el-form-item>
        <!-- submit(sysUser), 传过去的已经不是 ref 对象了 -->
        <el-button type="primary" @click="submit(sysUser)">提交</el-button>
        <el-button @click="closeSysUserDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!---数据表格-->
  <el-table v-if="list.length" :data="list" style="width: 100%">
    <el-table-column prop="userName" label="用户名" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="phone" label="手机" />
    <el-table-column prop="avatar" label="头像" #default="scope">
      <img :src="scope.row.avatar" width="50" />
    </el-table-column>
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="status" label="状态" #default="scope">
      {{ scope.row.status == 1 ? '正常' : '停用' }}
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作" align="center" width="280">
      <template v-slot:default="scope">
        <el-button
          type="primary"
          size="small"
          @click="updateSysUserShow(scope.row)"
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
          @click="showAssignRole(scope.row)"
        >
          分配角色
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <div v-if="!list.length" style="text-align: center; padding: 20px;">
    暂无数据
  </div>

  <el-dialog v-model="dialogRoleVisible" title="分配角色" width="40%">
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <!-- <el-input disabled :value="sysUser.userName"></el-input> -->
        <el-text>{{ sysUser.userName }}</el-text>
      </el-form-item>

      <el-form-item label="角色列表">
        <el-checkbox-group v-model="userRoleIds">
          <el-checkbox
            v-for="role in allRoleIds"
            :key="role.id"
            :value="role.id"
          >
            {{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="assignRoleToUser">提交</el-button>
        <el-button @click="closeAssignRoleDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-pagination
    v-model:current-page="pageParams.page"
    v-model:page-size="pageParams.limit"
    :page-sizes="[10, 20, 50, 100]"
    @size-change="fetchData"
    @current-change="fetchData"
    layout="total, sizes, prev, pager, next"
    :total="total"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  GetSysUserListByPage,
  AddSysUser,
  UpdateSysUser,
  DeleteSysUser,
  GetRolesListByUserId,
  AssignRoleToUser,
} from '@/api/sysUser'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useApp } from '@/pinia/modules/app'

// 表格数据模型
const list = ref([])

// 分页条数据模型
const total = ref(0)

// 分页数据
const pageParams = ref({
  page: 1, // 页码
  limit: 3, // 每页记录数
})

// 搜索表单数据
const queryDto = ref({
  keyword: '',
  createTimeBegin: '',
  createTimeEnd: '',
})
const createTimeBounderies = ref('')

const searchSysUser = () => {
  // console.log('queryDto = ', queryDto.value)
  // console.log('queryDto.value.keyword = ', queryDto.value.keyword)
  // console.log(queryDto.keyword)
  fetchData()
}

const resetSearchSysUserForm = () => {
  queryDto.value.keyword = ''
  createTimeBounderies.value = []
  fetchData()
}

const fetchData = async () => {
  console.log('fecht data...')

  if (createTimeBounderies.value.length == 2) {
    queryDto.value.createTimeBegin = createTimeBounderies.value[0]
    queryDto.value.createTimeEnd = createTimeBounderies.value[1]
    console.log('createTimeBounderies = ' + createTimeBounderies.value)
  } else {
    queryDto.value.createTimeBegin = ''
    queryDto.value.createTimeEnd = ''
  }

  // 请求后端接口进行分页查询
  const { code, message, data } = await GetSysUserListByPage(
    pageParams.value.page,
    pageParams.value.limit,
    queryDto.value
  )

  list.value = data.list
  total.value = data.total
  console.log('data = ', data)
}

onMounted(() => {
  fetchData()
})

// -------------------------添加用户-----------------------------

// 定义提交表单数据模型, 设置默认值
const defaultForm = {
  // id: null,
  // userName: '',
  // name: '',
  // phone: '',
  // password: '',
  // description: '',
  // avatar: '',
  status: 1, // 默认状态为正常, 此处相当于设置默认值。
}

const sysUser = ref({ ...defaultForm })
// const sysUser = ref(defaultForm) // 不要使用这种方式，因为会修改defaultForm的值, 后续重置的时候，会无法清空。

// 控制角色对话框显示状态, 控制对话框是否显示
const dialogVisible = ref(false)
// const isUpdate = ref(false) // 是否为更新操作
// const isAdd = ref(false) // 是否为添加操作

/* const dialogTitle = computed(() => {
  if (isAdd.value) {
    return '添加'
  } else if (isUpdate.value) {
    return '修改'
  }
  return ''
}) */

const dialogTitle = ref('')

const addSysUserShow = () => {
  dialogVisible.value = true
  // isAdd.value = true
  dialogTitle.value = '新增'
  // isUpdate.value = false
}

const updateSysUserShow = user => {
  dialogVisible.value = true
  // isAdd.value = false
  dialogTitle.value = '更新'
  // isUpdate.value = true
  sysUser.value = { ...user } // 深拷贝，避免直接修改原数据
}

// 重置新增或修改表单的数据
const resetSysUserForm = () => {
  sysUser.value = { ...defaultForm } // 深拷贝，避免直接修改原数据
}

const closeSysUserDialog = () => {
  dialogVisible.value = false
  resetSysUserForm()
}

const submit = async sysUser => {
  if (!sysUser.userName || !sysUser.name) {
    console.error('用户名和姓名不能为空')
    return
  }
  if (!sysUser.password) {
    console.error('密码不能为空')
    return
  }

  if (!sysUser.id) {
    addUser(sysUser)
  } else {
    updateUser(sysUser)
  }

  closeSysUserDialog()
}

const addUser = async sysUser => {
  try {
    const { code, message } = await AddSysUser(sysUser)
    if (code === 200) {
      ElMessage.success('用户添加成功: ' + message)
      fetchData()
    } else {
      ElMessage.error('用户添加失败: ' + message)
    }
  } catch (error) {
    ElMessage.error('添加用户时发生错误')
  }
}

// 修改用户
const updateUser = async sysUser => {
  try {
    const { code, message } = await UpdateSysUser(sysUser)
    if (code === 200) {
      ElMessage.success('用户修改成功: ' + message)
      fetchData()
    } else {
      ElMessage.error('用户修改失败: ' + message)
    }
  } catch (error) {
    ElMessage.error('修改用户时发生错误')
  }
}

// 删除用户
const deleteSysUser = async id => {
  if (!id) {
    ElMessage.error('用户ID不能为空')
    return
  }

  console.log('type of id = ', typeof id)

  const { code, message } = await DeleteSysUser(id)
  if (code === 200) {
    ElMessage.success('用户删除成功: ' + message)
    fetchData()
  } else {
    ElMessage.error('用户删除失败: ' + message)
  }

  fetchData()
}

const confirmDelete = async id => {
  await ElMessageBox.confirm('确定要删除该用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteSysUser(id)
    })
    .catch(() => {
      ElMessage.info('已取消删除操作')
    })
}

const headers = {
  token: useApp().authorization.token, // 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
}

// 图像上传成功以后的事件处理函数
const handleAvatarSuccess = (response, uploadFile) => {
  sysUser.value.avatar = response.data
}

// -------------------------------------角色分配--------------------------------------------------

// 选中的角色
const userRoleIds = ref([])

// 已知所有角色
const allRoleIds = ref([])

// 控制分配角色对话框的显示状态
const dialogRoleVisible = ref(false)

// 控制分配角色对话框的显示
const showAssignRole = async row => {
  sysUser.value = { ...row }
  dialogRoleVisible.value = true

  const { code, message, data } = await GetRolesListByUserId(row.id)

  console.log('GetRolesListByUserId data = ', data)

  if (code === 200) {
    userRoleIds.value = data.userRoleIdList
    allRoleIds.value = data.allRolesList
  } else {
    ElMessage.error('获取角色列表失败: ' + message)
  }
}

// 重置分配角色表单
const resetAssignRoleForm = () => {
  userRoleIds.value = []
}

// 关闭分配角色对话框
const closeAssignRoleDialog = () => {
  dialogRoleVisible.value = false
  resetAssignRoleForm()
}

// 角色分配按钮事件处理函数
const assignRoleToUser = async () => {
  let assginRole = {
    userId: sysUser.value.id,
    roleIdList: userRoleIds.value,
  }
  const { code, message, data } = await AssignRoleToUser(assginRole)
  if (code === 200) {
    ElMessage.success('操作成功')
    // dialogRoleVisible.value = false
    // fetchData()
    closeAssignRoleDialog()
  }
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
