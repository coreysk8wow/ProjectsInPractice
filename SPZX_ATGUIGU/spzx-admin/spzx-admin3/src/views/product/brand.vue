<template>
    <div class="tools-div">
        <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <el-table :data="list" style="width: 100%">
        <el-table-column prop="name" label="品牌名称" />
        <el-table-column prop="logo" label="品牌图标">
            <template #default="scope">
                <img :src="scope.row.logo" width="50" />
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" #default="scope" >
            {{ formatDateTime(scope.row.createTime) }}
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template v-slot:default="scope">
                <el-button type="primary" size="small" @click="editShow(scope.row)">
                    修改
                </el-button>
                <el-button type="danger" size="small" @click="deleteBrand(scope.row.id)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
        <el-form label-width="120px">
            <el-form-item label="品牌名称">
                <el-input v-model="brand.name" />
            </el-form-item>
            <el-form-item label="品牌图标">
                <el-upload class="avatar-uploader" action="http://localhost:8501/admin/system/uploadFile"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :headers="headers">
                    <img v-if="brand.logo" :src="brand.logo" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveOrUpdate">提交</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-pagination v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit"
        :page-sizes="[3, 10, 20, 50, 100]" layout="total, sizes, prev, pager, next" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
    GetBrandPageList,
    AddBrand,
    UpdateBrandById,
    DeleteBrandById,
} from '@/api/brand.js'
import { useApp } from '@/pinia/modules/app'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDateTime } from '@/utils/date-util.js'

const list = ref([])

// 分页条数据模型
const total = ref(0)

//分页条数据模型
const pageParams = ref({
    page: 1, // 页码
    limit: 3, // 每页记录数
})

//页面变化
const handleSizeChange = size => {
    // pageParams.value.limit = size
    fetchData()
}
const handleCurrentChange = number => {
    // pageParams.value.page = number
    fetchData()
}

// 分页查询
const fetchData = async () => {
    const { code, message, data } = await GetBrandPageList(
        pageParams.value.page,
        pageParams.value.limit
    )
    if (code === 200) {
        list.value = data.list
        total.value = data.total

        console.log('fetch data, data: ', data)
    } else {
        ElMessage.error('获取数据失败。', message)
    }

    console.log('fetch data, list: , ', list)
}

// 钩子函数
onMounted(() => {
    fetchData()
})

// -------------------- 添加、修改 ---------------------

// 定义提交表单数据模型
const defaultForm = {
    id: '',
    name: '',
    logo: '',
}
const brand = ref({ ...defaultForm })

const dialogTitle = ref('')

const headers = {
    // 从pinia中获取token，在进行文件上传的时候将token设置到请求头中
    token: useApp().authorization.token,
}

const dialogVisible = ref(false)

// 显示添加品牌表单
const addShow = () => {
    dialogTitle.value = '添加'
    dialogVisible.value = true
    // brand.value = {...defaultForm}
}

// 关闭对话框
const closeDialog = () => {
    dialogVisible.value = false
    brand.value = { ...defaultForm }
}

//上传
const handleAvatarSuccess = response => {
    brand.value.logo = response.data
}

// 保存数据
const saveOrUpdate = () => {
    if (!brand.value.id) {
        addBrand()
    } else {
        updateBrand()
    }
    closeDialog()
}

// 新增
const addBrand = async () => {
    const { code, message } = await AddBrand(brand.value)
    if (code === 200) {
        dialogVisible.value = false
        ElMessage.success('操作成功')
        fetchData()
    } else {
        ElMessage.error('添加失败。', message)
    }
}

//进入修改
const editShow = row => {
    dialogTitle.value = '修改'
    brand.value = row
    dialogVisible.value = true
}

// 修改
const updateBrand = async () => {
    const { code, message, data } = await UpdateBrandById(brand.value)
    if (code === 200) {
        ElMessage.success('操作成功')
        fetchData()
    } else {
        ElMessage.error('修改失败。', message)
    }

    dialogVisible.value = false
}

// ------------------- 删除 ---------------------------
const deleteBrand = async id => {
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const { code, message } = await DeleteBrandById(id)
        if (code === 200) {
            ElMessage.success('操作成功')
            fetchData()
        } else {
            ElMessage.error('删除失败。', message)
        }
    })
}
</script>

<style scoped>
.tools-div {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 3px;
    background-color: #fff;
}
</style>
