<template>
    <div class="sidebar">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse">
            <div v-for="route in menuRoutes" :key="route.path">
                <el-sub-menu :index="route.name" v-if="route.children">
                    <template #title>
                        <el-icon v-if="route.meta!.icon!==''">
                            <component :is="route.meta!.icon"></component>
                        </el-icon>
                        <span>{{ route.meta!.title }}</span>
                    </template>
                    <el-menu-item
                        v-for="item in route.children"
                        :key="item.path"
                        :index="item.path"
                        @click="handleSelect(item.path, item.path)"
                    >
                        <div class="itemsLeft">
                            <el-icon v-if="item.meta!.icon!==''">
                                <component :is="item.meta!.icon"></component>
                            </el-icon>
                            <span>{{ item.meta!.title }}</span>
                        </div>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else @click="handleSelect(route.path, '')" :key="route.path" :index="route.path">
                    <el-icon v-if="route.meta!.icon!==''">
                        <component :is="route.meta!.icon"></component>
                    </el-icon>
                    {{ route.meta!.title }}
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import router from '../../router/index'

    const activeIndex = ref('/dashboard')
    const isCollapse = ref(false)

    // const route = useRoute()
    const vueRouter = useRouter()

    onMounted(() => {
        // 刷新页面定义当前页
        activeIndex.value = vueRouter.currentRoute.value.fullPath
    })

    // 获取需要在菜单栏显示的路由
    const menuRoutes = router.options.routes.filter((route) => route.name === 'layout')[0].children

    // 获取当前激活的菜单项

    const handleSelect = (root: string, index: string) => {
        vueRouter.push(root)
        if (index === '') {
            activeIndex.value = root
        } else {
            activeIndex.value = index
        }
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
        .itemsLeft {
            padding-left: 20px;
        }
    }
</style>
