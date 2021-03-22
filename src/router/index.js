import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import store from '@/store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    { 
        path: '/account',
        name: 'Account',
        component: () => import( /* webpackChunkName: "manage" */ '../views/Account.vue'),
        meta: {
            requiresAuth: true
        }  
    },
    { 
        path: '/settings',
        name: 'Settings',
        component: () => import( /* webpackChunkName: "manage" */ '../views/Settings.vue'),
        meta: {
            requiresAuth: true
        }  
    },
    { 
        path: '/manage/',
        component: () => import( /* webpackChunkName: "manage" */ '../views/Manage.vue'),
        meta: {
            requiresAuth: true
        }  
    },
    { 
        path: '/manage/products',
        component: () => import( /* webpackChunkName: "manage" */ '../views/Products.vue'),
        meta: {
            requiresAuth: true
        }
        
    },
]


const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(!store.getters['auth/isAuthenticated'] && to.name !== 'Login') {
        router.push({ name: 'Login' })
    }

    if (to.name === 'Login' && store.getters['auth/isAuthenticated']) {
        router.push({ name: 'Dashboard' })
    }
    next();
})

export default router