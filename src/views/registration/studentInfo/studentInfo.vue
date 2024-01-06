<template>
    <div class="studentInfo">
        <div class="search">
            <el-form
                stripe
                :model="state.tableSearchParams"
                label-position="right"
            >
                <el-form-item label="姓名：">
                    <el-input
                        v-model="state.tableSearchParams.name"
                        placeholder="请输入姓名"
                    />
                </el-form-item>
                <el-form-item label="性别：">
                    <el-select
                        v-model="state.tableSearchParams.sex"
                        placeholder="请选择性别"
                    >
                        <el-option label="男" value="1" />
                        <el-option label="女" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码：">
                    <el-input
                        v-model="state.tableSearchParams.idCard"
                        placeholder="请输入证件号码"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input
                        v-model="state.tableSearchParams.phone"
                        placeholder="请输入手机号"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                    <el-button type="primary" @click="getData()">
                        刷新
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_content">
            <el-table
                :data="state.tableData"
                stripe
                border
                :header-row-class-name="headerClassName"
                :header-cell-style="{
                    fontSize: '18px',
                    padding: '20px 0',
                    textAlign: 'center',
                }"
                :row-style="{
                    textAlign: 'center',
                }"
            >
                <el-table-column type="selection" />
                <el-table-column prop="name" label="姓名" width="100" />
                <el-table-column prop="sex" label="性别" width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <p>
                                {{
                                    scope.row.sex === 1
                                        ? '男'
                                        : scope.row.sex === 1
                                        ? '女'
                                        : ''
                                }}
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="idCard" label="证件号码" />
                <el-table-column prop="idFrontside" label="身份证照片">
                    <template #default="scoped">
                        <el-image
                            :src="scoped.row.idFrontside"
                            :preview-src-list="[scoped.row.idFrontside]"
                            :max-scale="7"
                            :min-scale="0.2"
                            :initial-index="0"
                            fit="cover"
                            preview-teleported="true"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机号" />
                <el-table-column prop="email" label="电子邮箱" />
                <el-table-column prop="birthday" label="生日" />
                <el-table-column prop="juniorHighSchool" label="初中学校" />
                <el-table-column prop="access" label="获取途径" />
                <el-table-column prop="grade" label="年级" />
                <el-table-column prop="interest" label="兴趣爱好" />
                <el-table-column prop="awards" label="获奖情况" />
                <el-table-column prop="practice" label="社会实践" />
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
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue'
    import GetStudentInfo from './studentInfo'

    interface ITable {
        name: string
        sex: string
        idCard: string
        idFrontside: string
        phone: string
        email: string
        birthday: string
        juniorHighSchool: string
        access: string
        grade: string
        interest: string
        awards: string
        practice: string
    }

    // interface User {
    //     date: string
    //     name: string
    //     address: string
    // }

    // const tableRowClassName = ({
    //     row,
    //     rowIndex,
    // }: {
    //     row: User
    //     rowIndex: number
    // }) => {
    //     if (rowIndex % 2 === 0) {
    //         return 'doubleRow'
    //     } else {
    //         return 'singleRow'
    //     }
    //     return ''
    // }

    const state: {
        tableData: Array<ITable>
        tableSearchParams: {
            total: string
            pageNum: string
            pageSize: string
            name?: string
            sex?: string
            idCard?: string
            phone?: string
        }
    } = reactive({
        tableData: [],
        tableSearchParams: {
            total: '0',
            pageNum: '1',
            pageSize: '10',
            name: '',
            sex: '',
            idCard: '',
            phone: '',
        },
    })

    const onSearch = () => {
        getData()
    }

    const getData = () => {
        GetStudentInfo(state.tableSearchParams).then((res: any) => {
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

    const headerClassName = () => {
        return 'singleRow'
    }

    const handleSizeChange = (val: number) => {
        state.tableSearchParams.pageSize = `${val}`
        getData()
    }
    const handleCurrentChange = (val: number) => {
        state.tableSearchParams.pageNum = `${val}`
        getData()
    }
</script>

<style scoped lang="scss">
    .studentInfo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .search {
            margin-bottom: 20px;
            border-bottom: solid 1px #ebeef5;
            .el-form {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .el-form-item {
                    min-width: 300px;
                    max-width: 300px;
                    margin-right: 20px;
                    .el-select {
                        width: 100%;
                    }
                }
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
    }
</style>
