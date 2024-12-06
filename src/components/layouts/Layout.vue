<template>
    <div class="layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside>
                    <SideBar></SideBar>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
    .layout {
        width: 100vw;
        height: 100vh;
        .el-container {
            .el-header {
                height: 80px;
                padding: 0;
            }
            .el-aside {
                width: 200px;
                padding: 0;
                height: calc(100vh - 80px);
            }
            .el-main {
                padding: 20px;
                height: calc(100vh - 80px);
                overflow: scroll;
                background-color: #faf7f5;
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>
