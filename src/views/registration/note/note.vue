<template>
    <div class="studentInfo">
        <div class="searchForm">
            <div class="search">
                <el-form stripe :model="state.tableSearchParams" label-position="right">
                    <el-form-item label="姓名：">
                        <el-input
                            v-model="state.tableSearchParams.name"
                            placeholder="请输入姓名"
                            clearable
                            @change="getData"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="refresh"> 刷新 </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn_group">
                <el-button type="primary" @click="openAddPopup">新增</el-button>
            </div>
        </div>
        <div class="table_content">
            <el-table
                :data="state.tableData"
                stripe
                border
                header-row-class-name="singleRow"
                :header-cell-style="{
                    fontSize: '18px',
                    padding: '20px 0',
                    textAlign: 'center',
                }"
                :cell-style="{
                    textAlign: 'center',
                }"
            >
                <el-table-column type="selection" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column prop="phone" label="手机号" />
                <el-table-column prop="status" label="是否通知">
                    <template #default="scope">
                        <p>{{ scope.row.status ? '是' : '否' }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="openEditPopup(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="delUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                layout="total,sizes,prev, pager, next,jumper"
                v-model:current-page="state.tableSearchParams.pageNum"
                v-model:page-size="state.tableSearchParams.pageSize"
                :total="state.tableSearchParams.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <el-dialog v-model="Popup" title="新增" width="550">
            <div class="e_body">
                <el-form :model="userForm" ref="ruleFormRef" :rules="rules" label-width="100">
                    <el-form-item label="用户名:" prop="name">
                        <el-input v-model="userForm.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="手机号:" prop="phone">
                        <el-input v-model.number="userForm.phone" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="是否通知:" prop="status">
                        <el-select v-model="userForm.status" placeholder="请选择类型" clearable>
                            <el-option label="是" :value="1" />
                            <el-option label="否" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="Popup = false">取消</el-button>
                    <el-button type="primary" @click="submitForm"> 确认 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue'
    import { GetNoteInfo, addNoteInfo, editNoteInfo, delNoteInfo } from './note'
    import type { FormRules } from 'element-plus'

    const state = reactive({
        tableData: [],
        tableSearchParams: {
            total: 0,
            pageNum: 1,
            pageSize: 20,
            name: '',
        },
    })

    const Popup = ref(false)
    const PopupStatus = ref('')

    const userForm = ref({
        id: null,
        name: '',
        phone: '',
        status: 1,
    })

    const ruleFormRef = ref<any>(null)
    const rules = reactive<FormRules>({
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    })

    const refresh = () => {
        state.tableSearchParams.name = ''
        getData()
    }

    const getData = () => {
        GetNoteInfo(state.tableSearchParams).then((res: any) => {
            if (res.code === 200) {
                state.tableData = res.data.list
                state.tableSearchParams.total = res.data.total
                state.tableSearchParams.pageNum = res.data.pageNum
                state.tableSearchParams.pageSize = res.data.pageSize
            }
        })
    }

    onMounted(() => {
        getData()
    })

    const handleSizeChange = (val: number) => {
        state.tableSearchParams.pageSize = val
        getData()
    }
    const handleCurrentChange = (val: number) => {
        state.tableSearchParams.pageNum = val
        getData()
    }

    const openAddPopup = () => {
        userForm.value = {
            id: null,
            name: '',
            phone: '',
            status: 1,
        }
        PopupStatus.value = 'add'
        Popup.value = true
    }

    const openEditPopup = (data: any) => {
        userForm.value = {
            id: data.id,
            name: data.name,
            phone: data.phone,
            status: data.status,
        }
        PopupStatus.value = 'edit'
        Popup.value = true
    }

    const addUser = () => {
        addNoteInfo(userForm.value).then((res: any) => {
            if (res.code === 200) {
                ElMessage.success('新增成功')
                getData()
            }
        })
    }

    const editUser = () => {
        editNoteInfo(userForm.value).then((res: any) => {
            if (res.code === 200) {
                ElMessage.success('修改成功')
                getData()
            }
        })
    }

    const delUser = (data: any) => {
        ElMessageBox({
            title: '提示',
            message: `确认删除${data.name}吗？`,
            showCancelButton: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            customStyle: { width: '200px' },
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    delNoteInfo({ id: data.id }).then((res: any) => {
                        instance.confirmButtonLoading = false
                        done()
                        if (res.code === 200) {
                            ElMessage.success('删除成功')
                            getData()
                        }
                    })
                } else {
                    done()
                }
            },
        })
    }

    const submitForm = () => {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validate((valid: any) => {
            // 表单验证成功
            if (valid) {
                // 获取规格信息
                PopupStatus.value === 'add' ? addUser() : editUser()
                Popup.value = false
            } else {
                return false
            }
        })
    }
</script>

<style scoped lang="scss">
    .studentInfo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .searchForm {
            margin-bottom: 20px;
            border-bottom: solid 1px #ebeef5;
            display: flex;
            justify-content: space-between;
            .search {
                .el-form {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .el-form-item {
                        margin-right: 20px;
                        .el-select {
                            width: 100%;
                        }
                    }
                }
            }
            .btn_group {
            }
        }
        .table_content {
            width: 100%;
            flex: 1 1 auto;
            overflow: hidden;
            .el-table {
                height: 100%;
                z-index: 1;
            }
        }
        .pagination {
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .e_body {
            width: 100%;
            display: flex;
            justify-content: center;
            .el-form {
                width: 90%;
                .el-form-item {
                    margin-bottom: 1rem;
                    width: 100%;
                }
                .el-row {
                    width: 100%;
                }
                .el-select {
                    width: 100%;
                }
            }
        }
    }
</style>
