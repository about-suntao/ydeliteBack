<template>
    <div class="sidebar">
        <div class="Collapse" @click="handleCollapse">
            <el-icon v-if="isCollapse"><Expand /></el-icon>
            <el-icon v-else><Fold /></el-icon>
        </div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
        >
            <el-sub-menu
                v-for="route in menuRoutes"
                :key="route.path"
                :index="route.path"
            >
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>{{ route.name }}</span>
                </template>
                <el-menu-item
                    @click="handleSelect(route.path, item.path)"
                    v-for="item in route.children"
                    :key="item.path"
                    :index="item.path"
                    >{{ item.name }}</el-menu-item
                >
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { Expand, Fold, Location } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    import router from '../../router/index'

    const isCollapse = ref(false)
    const handleCollapse = () => {
        isCollapse.value = !isCollapse.value
    }

    // const route = useRoute()
    const vueRouter = useRouter()

    // 获取需要在菜单栏显示的路由
    const menuRoutes = router.options.routes.filter(
        (route) => route.meta?.isMenu
    )

    // 获取当前激活的菜单项
    const activeIndex = ref('')

    // 菜单项点击处理函数
    const handleSelect = (root: string, index: string) => {
        console.log('🚀 ~ file: SideBar.vue:57 ~ handleSelect ~ root:', root)
        vueRouter.push(`${index === '' ? '' : '/'}${index}`)
        activeIndex.value = index
    }
</script>

<style scoped lang="scss">
    .sidebar {
        width: 100%;
        height: 100%;
        .Collapse {
            height: 30px;
            width: 100%;
            background-color: #3d404a;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
        .el-menu-vertical-demo {
            height: calc(100vh - 110px);
            background-color: #3d404a;
            color: white;
        }
        :deep(.el-sub-menu__title) {
            color: white;
        }
        :deep(.el-menu) {
            border: none;
            background-color: #3d404a;
            color: white;
            .el-menu-item {
                color: white;
            }
        }
        :deep(.el-sub-menu__title:hover) {
            background-color: #34373f;
        }
        :deep(.el-menu-item:hover) {
            background-color: #34373f;
        }
        :deep(.el-menu-item.is-active) {
            background-color: #34373f !important;
        }
    }
</style>
