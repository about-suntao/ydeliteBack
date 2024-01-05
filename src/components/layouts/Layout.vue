<template>
    <div class="layout">
        <el-container v-if="showLayout">
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
        <el-container v-else>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'
    const route = useRoute()
    const showLayout = computed(() => route.meta.isLayout)
</script>

<style scoped lang="scss">
    .layout {
        padding: 0;
        margin: 0;
        .el-container {
            .el-header {
                padding: 0;
                height: 80px;
            }

            .el-aside {
                width: max-content;
                padding: 0;
                height: calc(100vh - 80px);
            }
            .el-main {
                padding: 20px;
                height: calc(100vh - 80px);
            }
        }
    }
</style>
