//引入路由对象
import LayoutVue from '@/components/layouts/Layout.vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// ! meta.isLayout 是否需要header sidebar布局

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '',
        component: LayoutVue,
        redirect: '/login',
        meta: {
            isLayout: false,
            isMenu: false,
        },
        children: [
            {
                path: 'login',
                name: '登录',
                meta: {
                    isLayout: false,
                    isMenu: false,
                },
                component: () => import('@/views/login/login.vue'),
            },
        ],
    },
    {
        path: '/',
        name: '报名管理',
        component: LayoutVue,
        meta: {
            isLayout: true,
            isMenu: true,
        },
        children: [
            {
                path: 'studentInfo',
                name: '学生管理',
                meta: {
                    isLayout: true,
                    isMenu: true,
                },
                component: () =>
                    import('@/views/registration/studentInfo/studentInfo.vue'),
            },
            // {
            //     path: 'add',
            //     name: '添加产品',
            //     meta: {
            //         isLayout: true,
            //     },
            //     component: () => import('@/views/product/addProduct.vue'),
            // },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    if (to.path == '/login') {
        // 登录或者注册才可以往下进行
        next()
    } else {
        // 获取 token
        const token = localStorage.getItem('Authorization')
        // token 不存在
        if (token === null || token === '') {
            ElMessage.error('请先登录')
            next('/login')
        } else {
            next()
        }
    }
})

//导出router
export default router
