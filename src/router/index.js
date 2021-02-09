import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import TokenService from '../service/TokenService';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import( /* webpackChunkName: "about" */ '../views/Dashboard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            requiresAuth: true
        }
    }
]


const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(!TokenService.isAuthenticated() && to.name !== 'Login') {
        router.push({ name: 'Login' })
    }

    if (to.name === 'Login' && TokenService.isAuthenticated()) {
        router.push({ name: 'Dashboard' })
    }
    next();
})

export default router