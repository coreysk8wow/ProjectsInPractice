<template>
  <div class="tools-div">
    <el-button type="success" size="small" @click="addShow">添 加</el-button>
    <el-button type="primary" size="small" @click="toggleExpandAll">
      {{ isExpanded ? '收起所有' : '展开所有' }}
    </el-button>
  </div>

  <el-dialog v-model="dialogVisible" :header="dialogTitle" width="30%">
    <el-form label-width="120px">
      <el-form-item label="菜单标题">
        <el-input v-model="sysMenu.title" />
      </el-form-item>
      <el-form-item label="路由名称">
        <el-input v-model="sysMenu.component" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="sysMenu.sortValue" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="sysMenu.status">
          <el-radio :value="1">正常</el-radio>
          <el-radio :value="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdate">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-table
    v-if="isShow"
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :default-expand-all="isExpanded"
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="title" label="菜单标题" />
    <el-table-column prop="component" label="路由名称" />
    <el-table-column prop="sortValue" label="排序" />
    <el-table-column prop="status" label="状态" v-slot:default="scope">
      {{ scope.row.status == 1 ? '正常' : '停用' }}
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" #default="scope">
        {{ new Date(scope.row.createTime).toLocaleString('zh-CN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        }).replace(/\//g, '-') }}
    </el-table-column>

    <el-table-column
      label="操作"
      align="center"
      width="280"
      v-slot:default="scope"
    >
      <el-button type="success" size="small" @click="addShow(scope.row)">
        添加下级节点
      </el-button>
      <el-button type="primary" size="small" @click="editShow(scope.row)">
        修改
      </el-button>
      <el-button type="danger" size="small" @click="deleteMenu(scope.row.id)">
        删除
      </el-button>
    </el-table-column>
  </el-table>
</template>

<script setup>
//引入调用的方法
import { ref, onMounted, nextTick } from 'vue'
import {
  GetMenuTree,
  AddMenu,
  UpdateMenuById,
  DeleteMenuById,
} from '@/api/sysMenu'
import { ElMessage, ElMessageBox } from 'element-plus'

// 定义表格数据模型
const list = ref([])

// 定义添加表单菜单表单相关数据模型
const dialogTitle = ref()
const dialogVisible = ref(false)

//页面表单数据
const defaultForm = {
  id: '',
  parentId: 0,
  title: '',
  url: '',
  component: '',
  icon: '',
  sortValue: 1,
  status: 1,
}
// 表单响应式数据模型对象
const sysMenu = ref({ ...defaultForm })

//=======================加载数据=========================
onMounted(() => {
  fetchData()
})

//=======================添加和修改功能====================
//进入添加
const addShow = row => {
  sysMenu.value = { ...defaultForm }

  if (!row.id) {
    dialogTitle.value = '添加'
  } else {
    dialogTitle.value = '添加下级节点'
    sysMenu.value.parentId = row.id
  }
  dialogVisible.value = true
}

//进入修改
const editShow = row => {
  console.log('Edit menu: ', row)
  sysMenu.value = { ...row }
  dialogVisible.value = true
}

//提交新增或修改
const addOrUpdate = () => {
  if (!sysMenu.value.id) {
    if (!sysMenu.value.parentId) {
      sysMenu.value.parentId = 0
    }
    addMenu()
  } else {
    updateMenu()
  }
}

// 修改
const updateMenu = async () => {
  const { code } = await UpdateMenuById(sysMenu.value)
  if (code === 200) {
    ElMessage.success('操作成功')
  } else {
    ElMessage.error('操作失败')
  }
  closeDialog()
  fetchData()
}

// 新增
const addMenu = async () => {
  const { code } = await AddMenu(sysMenu.value)
  if (code === 200) {
    ElMessage.success('操作成功')
  } else {
    ElMessage.error('操作失败')
  }
  closeDialog()
  fetchData()
}

const closeDialog = () => {
  sysMenu.value = { ...defaultForm }
  dialogVisible.value = false
}

//=======================分页列表====================
const fetchData = async () => {
  const { code, data, message } = await GetMenuTree()
  list.value = data

  console.log('fetchData')
  console.log(data)
}

//=======================删除功能====================
const deleteMenu = async id => {
  console.log('Delete menu by id: ' + id)
  ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 前端校验是否一个菜单有子菜单。
    const menu = findMenuById(list.value, id)
    if (menu && menu.children && menu.children.length > 0) {
      ElMessage.error('该节点下有子节点，不可以删除，请先删除子菜单。')
      return
    }

    const { code, message } = await DeleteMenuById(id)
    if (code === 200) {
      ElMessage.success('删除成功')
      fetchData()
    } else {
      ElMessage.error('删除失败。Message: ' + message)
    }
  })
}
// 根据menu id 在list中查找menu, 递归方法
const findMenuById = (menus, targetId) => {
  for (const menu of menus) {
    if (menu.id === targetId) {
      return menu
    }
    if (menu.children && menu.children.length > 0) {
      const found = findMenuById(menu.children, targetId)
      if (found) return found
    }
  }
  return null
}

// ---------------------- 一键折叠/展开 element plus tree table----------------------------
// Expand/collapse state
const isExpanded = ref(false)
const isShow = ref(true)

// Toggle expand/collapse all
const toggleExpandAll = async () => {
  isShow.value = false
  isExpanded.value = !isExpanded.value
  await nextTick()
  isShow.value = true
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
