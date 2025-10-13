<template>
    <div class="search-div">
        <el-form label-width="70px" size="small">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="品牌">
                        <el-select class="m-2" placeholder="选择品牌" size="small" style="width: 100%"
                            v-model="queryDto.brandId">
                            <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="分类">
                        <el-cascader :props="categoryProps" style="width: 100%" v-model="searchCategoryIdList" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="display:flex">
                <el-button type="primary" size="small" @click="fetchData()">
                    搜索
                </el-button>
                <el-button size="small" @click="resetSearchData">重置</el-button>
            </el-row>
        </el-form>
    </div>

    <div class="tools-div">
        <el-button type="success" size="small" @click="addShow">添 加</el-button>
    </div>

    <el-dialog v-model="dialogVisible" v-bind:title="dialogTitle" width="30%">
        <el-form label-width="120px">
            <el-form-item label="品牌">
                <el-select class="m-2" placeholder="选择品牌" size="small" v-model="categoryBrand.brandId">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="分类">
                <el-cascader :props="categoryProps" v-model="categoryIdList" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdate">提交</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-table :data="list" style="width: 100%">
        <el-table-column prop="categoryName" label="分类" />
        <el-table-column prop="brandName" label="品牌" />
        <el-table-column prop="logo" label="品牌图标" #default="scope">
            <img :src="scope.row.logo" width="50" />
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" #default="scope" >
            {{ formatDateTime(scope.row.createTime) }}
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template v-slot:default="scope">
                <el-button type="primary" size="small" @click="editShow(scope.row)">
                    修改
                </el-button>
                <el-button type="danger" size="small" @click="remove(scope.row.id)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="pageParams.page" v-model:page-size="pageParams.limit"
        :page-sizes="[3, 10, 20, 50, 100]" layout="total, sizes, prev, pager, next" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FindAllBrand } from '@/api/brand.js'
import { FindCategoryByParentId } from '@/api/category.js'
import {
    GetCategoryBrandPageList,
    AddCategoryBrand,
    UpdateCategoryBrandById,
    DeleteCategoryBrandById,
} from '@/api/categoryBrand.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import {formatDateTime} from '@/utils/date-util.js'

const props = {
    lazy: true,
    value: 'id',
    label: 'name',
    leaf: 'leaf',
    checkStrictly: false,
    async lazyLoad(node, resolve) {
        // 加载数据的方法
        if (typeof node.value == 'undefined') node.value = 0
        const { data } = await FindCategoryByParentId(node.value)
        data.forEach(function (item) {
            //hasChildren判断是否有子节点
            item.leaf = !item.hasChildren
        })
        resolve(data) // 返回数据
    },
}
const categoryProps = ref(props)

//查询所有品牌
const selectAllBrandList = async () => {
    const { data } = await FindAllBrand()
    brandList.value = data
}

// 定义搜索表单数据模型
const brandList = ref([])
// 定义表格数据模型
const list = ref([])
// 分页条数据模型
const total = ref(0)
// 搜索表单数据模型
const queryDto = ref({ brandId: '', categoryId: '' })
const searchCategoryIdList = ref([])
//分页条数据模型
const pageParamsForm = {
    page: 1, // 页码
    limit: 3, // 每页记录数
}
const pageParams = ref(pageParamsForm)

// onMounted钩子函数
onMounted(() => {
    selectAllBrandList() // 查询所有的品牌数据
    fetchData()
})

//重置
const resetSearchData = () => {
    queryDto.value = { brandId: '', categoryId: '' }
    searchCategoryIdList.value = []
    fetchData()
}

//分页变化
const handleSizeChange = size => {
    pageParams.value.limit = size
    fetchData()
}
const handleCurrentChange = number => {
    pageParams.value.page = number
    fetchData()
}

// 分页列表查询
const fetchData = async () => {
    if (searchCategoryIdList.value.length == 3) {
        queryDto.value.categoryId =
            searchCategoryIdList.value[searchCategoryIdList.value.length - 1]
    }
    console.log('searchCategoryIdList, ', searchCategoryIdList.value)

    const { data } = await GetCategoryBrandPageList(
        pageParams.value.page,
        pageParams.value.limit,
        queryDto.value
    )
    list.value = data.list
    total.value = data.total
}

// ---------------------- 添加 或 修改 ----------------------------

// 添加或修改弹出对话框的标题
const dialogTitle = ref('')

//页面表单数据
const defaultForm = {
    id: '',
    brandId: '',
    categoryId: '',
}
const categoryBrand = ref({ ...defaultForm })

const categoryIdList = ref([])

const dialogVisible = ref(false)

//进入添加
const addShow = () => {
    dialogTitle.value = '添加'
    // categoryBrand.value = {}
    dialogVisible.value = true
}

//进入修改
const editShow = row => {
    dialogTitle.value = '修改'
    categoryBrand.value = row
    dialogVisible.value = true
}

function resetDialog() {
    categoryBrand.value = { ...defaultForm }
    categoryIdList.value = []
}

//提交保存与修改
const addOrUpdate = () => {
    if (categoryBrand.value.brandId == '') {
        ElMessage.info('品牌信息必须选择')
        return
    }
    //categoryId为数组：[1,2,3]
    if (categoryIdList.value.length != 3) {
        ElMessage.info('分类信息必须选择')
        return
    }

    console.log('categoryIdList: ', categoryIdList.value)

    //系统只需要三级分类id
    categoryBrand.value.categoryId =
        categoryIdList.value[categoryIdList.value.length - 1]
    if (!categoryBrand.value.id) {
        add()
    } else {
        update()
    }

    dialogVisible.value = false
    resetDialog()
}

// 新增
const add = async () => {
    console.log('add categoryBrand: ', categoryBrand.value)
    const { code, message, data } = await AddCategoryBrand(categoryBrand.value)
    if (code === 200) {
        ElMessage.success('操作成功')
        fetchData()
    } else {
        ElMessage.error('添加失败, ', message)
    }
}

// 修改
const update = async () => {
    console.log('update categoryBrand: ', categoryBrand.value)
    const { code, message, data } = await UpdateCategoryBrandById(
        categoryBrand.value
    )
    dialogVisible.value = false
    if (code === 200) {
        ElMessage.success('操作成功')
        fetchData()
    } else {
        ElMessage.error('修改失败, ', message)
    }
}

// ------------------------ 删除 ----------------------------
//删除
const remove = async id => {
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(async () => {
            const { code, message } = await DeleteCategoryBrandById(id)
            if (code === 200) {
                ElMessage.success('删除成功')
                fetchData()
            } else {
                ElMessage.error('删除失败, ', message)
            }
        })
        .catch(() => {
            ElMessage.info('取消删除')
        })
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
