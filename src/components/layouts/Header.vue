<template>
    <div class="header">
        <div class="logo">
            <img src="../../assets/img/login/logo.png" />
        </div>
        <div class="user">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar>
                        <el-image :src="usrInfo.avatar"></el-image>
                    </el-avatar>
                    <span>{{ usrInfo.name }}</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut"> 退出登录 </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ArrowDown } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const usrInfo = JSON.parse(localStorage.getItem('Authorization') as string)

    const logOut = () => {
        router.push('/login')
    }
</script>

<style scoped lang="scss">
    .header {
        height: 80px;
        background-color: #3d404a;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 120px;
        .logo {
            img {
                width: 200px;
                height: auto;
            }
        }
        .user {
            display: flex;
            align-items: center;
            .el-dropdown {
                :focus-visible {
                    outline: none !important;
                }
                color: white;
                .el-dropdown-link {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .el-avatar {
                        background-color: white;
                        color: black;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
