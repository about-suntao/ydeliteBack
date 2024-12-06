import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutVue from '@/components/layouts/Layout.vue'

const routes: Array<RouteRecordRaw> = [
    // 后台管理系统的路由
    {
        path: '/',
        name: 'layout',
        component: LayoutVue,
        redirect: 'studentInfo',
        meta: {
            title: '',
            icon: '',
            hidden: false,
        },
        children: [
            {
                path: '',
                name: 'info',
                component: null,
                meta: {
                    title: '报名管理',
                    icon: 'Search',
                    hidden: false,
                },
                children: [
                    {
                        path: '/studentInfo',
                        name: 'studentInfo',
                        component: () => import('@/views/registration/studentInfo/studentInfo.vue'),
                        meta: {
                            title: '报名信息',
                            icon: '',
                            hidden: false,
                        },
                    },
                    {
                        path: '/announcement',
                        name: 'announcement',
                        component: () => import('@/views/registration/note/note.vue'),
                        meta: {
                            title: '短信管理',
                            icon: '',
                            hidden: false,
                        },
                    },
                ],
            },
            {
                path: '/admin',
                name: 'admin',
                component: () => import('@/views/admin/admin.vue'),
                meta: {
                    title: '管理员账号',
                    icon: 'Odometer',
                    hidden: false,
                },
            },
        ],
    },
    // 登录页面
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录',
            icon: '',
            hidden: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
// 路由守卫
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

export default router
