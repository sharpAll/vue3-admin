import {createRouter, createWebHashHistory} from "vue-router";
import Layout from "../components/Layout.vue";
//登录
import Login from "../views/Login.vue";
//首页
import Dashboard from "../views/Dashboard.vue";
// 策略
import StrategyDetail from "../views/strategy/detail.vue";
const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Layout",
        component: Layout,
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: {
                    title: '系统首页'
                },
                component: Dashboard
            }, {
                path: "/strategy/detail/:id",
                name: "StrategyDetail",
                meta: {
                    title: '策略详情'
                },
                component: StrategyDetail
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: Login
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 量化交易监控`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;